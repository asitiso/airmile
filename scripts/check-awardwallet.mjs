/**
 * Capability discovery only: no airline login, no seat search, no paid-search job.
 * The API credential belongs to AwardWallet, NOT to an airline loyalty account.
 * Public documentation: https://awardwallet.com/api/flight-award-search
 */
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ENDPOINT = 'https://ra.awardwallet.com/v1/providers/list';
const MAX_BYTES = 256 * 1024;
const REQUESTED = ['economy', 'business', 'firstClass'];
const CABINS = new Set([...REQUESTED, 'premiumEconomy', 'unknown']);
const AUTH_MODES = new Set(['none', 'consumer', 'optional', 'pooled']);
const object = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const invalid = () => { throw new Error('INVALID_METADATA'); };

/** Metadata describes advertised capabilities, never confirmed inventory. */
export function assessProviders(value) {
  if (!object(value) || value.apiVersion !== 1 || !Array.isArray(value.providers) || value.providers.length > 500) invalid();
  const codes = new Set();
  for (const p of value.providers) {
    if (!object(p) || typeof p.code !== 'string' || !/^[A-Za-z0-9_-]{1,80}$/.test(p.code) ||
        typeof p.displayName !== 'string' || !p.displayName.trim() || p.displayName.length > 200 || codes.has(p.code)) invalid();
    codes.add(p.code);
    if (p.loginRequired !== undefined && typeof p.loginRequired !== 'boolean') invalid();
    if (p.authMode !== undefined && typeof p.authMode !== 'string') invalid();
    if (p.priceCalendar !== undefined && (!object(p.priceCalendar) || !Array.isArray(p.priceCalendar.cabins) ||
        p.priceCalendar.cabins.length > 10 || p.priceCalendar.cabins.some(c => !CABINS.has(c)))) invalid();
  }
  // This exact program code is documented. Do not substitute partner programs.
  const korean = value.providers.find(p => p.code === 'korean');
  const advertised = korean?.priceCalendar?.cabins ?? [];
  let authMode = 'unknown-review-required';
  if (korean?.authMode !== undefined) {
    if (AUTH_MODES.has(korean.authMode)) authMode = korean.authMode;
  } else if (typeof korean?.loginRequired === 'boolean') {
    // Older wording is insufficient to establish a password-free search flow.
    authMode = 'legacy-review-required';
  }
  return {
    apiVersion: 1,
    providerCount: value.providers.length,
    skypass: {
      listed: Boolean(korean),
      calendarAdvertised: Boolean(korean?.priceCalendar),
      calendarCabins: [...new Set(advertised)],
      missingRequestedCalendarCabins: REQUESTED.filter(c => !advertised.includes(c)),
      authMode,
    },
    asiana: {
      candidateCount: value.providers.filter(p => /asiana|아시아나/i.test(p.displayName)).length,
      mappingVerified: false,
    },
    // Unknown provider fields, display names and credential defaults are omitted.
    inventoryVerified: false,
    searchExecuted: false,
  };
}

async function readMetadata(response) {
  if (!/^application\/(json|[a-z0-9.+-]+\+json)(?:\s*;|$)/i.test(response.headers.get('content-type') ?? '')) invalid();
  const size = response.headers.get('content-length');
  if (size !== null && (!/^\d+$/.test(size) || Number(size) > MAX_BYTES)) invalid();
  if (!response.body) invalid();
  const reader = response.body.getReader();
  const chunks = [];
  let count = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      count += value.byteLength;
      if (count > MAX_BYTES) { await reader.cancel(); invalid(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  return assessProviders(JSON.parse(Buffer.concat(chunks).toString('utf8')));
}

/** Single explicitly approved GET; never follows redirects or retries. */
export async function checkAwardWallet({ live = false, approved = false, username, password,
  fetchImpl = globalThis.fetch, timeoutMs = 10000 } = {}) {
  const result = (status, extra = {}) => ({ status, inventoryVerified: false, searchExecuted: false, ...extra });
  if (live !== true) return result('NOT_REQUESTED');
  if (approved !== true) return result('ACCESS_APPROVAL_REQUIRED');
  if (typeof username !== 'string' || !username || typeof password !== 'string' || !password) return result('API_CREDENTIALS_REQUIRED');
  if (/[:\r\n]/.test(username) || /[\r\n]/.test(password) || username.length + password.length > 4096) return result('INVALID_CREDENTIALS');
  if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 30000) return result('INVALID_CONFIGURATION');
  const controller = new AbortController();
  let timer;
  const deadline = new Promise(resolveDeadline => {
    timer = setTimeout(() => { resolveDeadline(result('TIMEOUT')); controller.abort(); }, timeoutMs);
  });
  const work = async () => {
    let response;
    try {
      response = await fetchImpl(ENDPOINT, {
        method: 'GET', redirect: 'error', credentials: 'omit', signal: controller.signal,
        headers: { 'X-Authentication': `${username}:${password}`, Accept: 'application/json' },
      });
    } catch { return result(controller.signal.aborted ? 'TIMEOUT' : 'NETWORK_ERROR'); }
    if (!response.ok) {
      const status = response.status;
      return result(status === 401 ? 'API_AUTH_REQUIRED' : status === 403 ? 'API_ACCESS_DENIED' :
        status === 429 ? 'RATE_LIMITED' : status >= 300 && status < 400 ? 'REDIRECT_REFUSED' : 'PROVIDER_UNAVAILABLE');
    }
    try { return result('METADATA_RECEIVED', { capabilities: await readMetadata(response) }); }
    catch { return result(controller.signal.aborted ? 'TIMEOUT' : 'INVALID_METADATA'); }
  };
  try { return await Promise.race([deadline, work()]); }
  finally { clearTimeout(timer); }
}

// No import-time side effects; tests never need network access or secrets.
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  if (args.length && !(args.length === 1 && args[0] === '--live')) {
    console.error('Usage: node scripts/check-awardwallet.mjs [--live]');
    process.exitCode = 2;
  } else {
    const report = await checkAwardWallet({
      live: args[0] === '--live', approved: process.env.AWARDWALLET_API_ACCESS_APPROVED === '1',
      username: process.env.AWARDWALLET_API_USER, password: process.env.AWARDWALLET_API_PASSWORD,
    });
    console.log(JSON.stringify(report, null, 2));
    process.exitCode = ['NOT_REQUESTED', 'METADATA_RECEIVED'].includes(report.status) ? 0 : 1;
  }
}
