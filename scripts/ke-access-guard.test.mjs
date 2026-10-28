import assert from 'node:assert/strict';
import { EventEmitter } from 'node:events';
import { test } from 'node:test';
import { createAccessGuard } from './ke-access-guard.mjs';
const response = (status, url='https://www.koreanair.com/public-test-resource') => ({status:()=>status,url:()=>url});
test('403 interrupts a pending UI wait instead of waiting for its timeout', async () => {
  const page=new EventEmitter(), guard=createAccessGuard(page);
  let finish;
  const operation=guard.run(()=>new Promise(resolve=>{finish=resolve;}));
  page.emit('response',response(403));
  // Resolve the old UI wait as well so a broken implementation fails promptly.
  queueMicrotask(()=>finish('old wait completed'));
  await assert.rejects(operation, error=>error.code==='ACCESS_RESTRICTED'&&error.status===403);
  guard.dispose();
});
test('a blocked request prevents the next UI action from starting', async () => {
  const page=new EventEmitter(), guard=createAccessGuard(page);
  page.emit('response',response(429));
  let calls=0;
  await assert.rejects(guard.run(async()=>{calls++;}), error=>error.status===429);
  assert.equal(calls,0); guard.dispose();
});
test('unrelated host errors do not masquerade as airline restrictions', async () => {
  const page=new EventEmitter(), guard=createAccessGuard(page);
  page.emit('response',response(403,'https://example.org/error'));
  page.emit('response',response(403,'https://fakekoreanair.com/error'));
  assert.equal(await guard.run(async()=>42),42); guard.dispose();
});
test('first-party 401, 403 and 429 remain distinct restriction statuses', async () => {
  for(const status of [401,403,429]) {
    const page=new EventEmitter(), guard=createAccessGuard(page);
    page.emit('response',response(status,'https://koreanair.com/public-resource'));
    await assert.rejects(guard.run(async()=>null),error=>error.status===status);
    guard.dispose();
  }
});
test('dispose removes the page listener and normal work passes through', async () => {
  const page=new EventEmitter(), guard=createAccessGuard(page);
  assert.equal(page.listenerCount('response'),1);
  assert.equal(await guard.run(async()=>'ok'),'ok');
  guard.dispose(); assert.equal(page.listenerCount('response'),0);
});
