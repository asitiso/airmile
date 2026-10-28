import assert from 'node:assert/strict';
import test from 'node:test';
import { assessProviders, checkAwardWallet } from './check-awardwallet.mjs';
// Synthetic contract fixtures: not current provider metadata or airline inventory.
const korean = {code:'korean',displayName:'Korean Air (SkyPass)',loginRequired:true,
  priceCalendar:{cabins:['economy','premiumEconomy','firstClass','unknown']}};
const payload = providers => ({apiVersion:1,providers});
const approved = {live:true,approved:true,username:'test-api-user',password:'test-api-password'};
const json = value => new Response(JSON.stringify(value),{headers:{'Content-Type':'application/json'}});
const offline = async () => { throw Error('Unexpected real request'); };

test('metadata preserves missing business instead of inventing complete calendar support',()=>{
  const report=assessProviders(payload([korean]));
  assert.equal(report.skypass.listed,true);
  assert.deepEqual(report.skypass.missingRequestedCalendarCabins,['business']);
  assert.equal(report.skypass.authMode,'legacy-review-required');
  assert.equal(report.inventoryVerified,false);
});
test('a partner program mentioning Korean Air does not count as SKYPASS',()=>{
  const report=assessProviders(payload([{...korean,code:'partner',displayName:'Partner miles - Korean Air flights'}]));
  assert.equal(report.skypass.listed,false);
});
test('Asiana-like entry remains a candidate until its own award program is verified',()=>{
  const report=assessProviders(payload([{code:'candidate-oz',displayName:'Asiana Club'}]));
  assert.equal(report.asiana.candidateCount,1);
  assert.equal(report.asiana.mappingVerified,false);
});
test('modern auth mode and exact advertised cabins are reported without using credentials',()=>{
  const report=assessProviders(payload([{...korean,authMode:'consumer',priceCalendar:{cabins:['economy','business','firstClass']},password:{defaultValue:'NEVER_PRINT'}}]));
  assert.equal(report.skypass.authMode,'consumer');
  assert.deepEqual(report.skypass.missingRequestedCalendarCabins,[]);
  assert.equal(JSON.stringify(report).includes('NEVER_PRINT'),false);
});
test('unrecognized authentication mode cannot silently become anonymous access',()=>{
  const report=assessProviders(payload([{...korean,authMode:'future-auth'}]));
  assert.equal(report.skypass.authMode,'unknown-review-required');
});
test('missing calendar metadata is unknown, not available and not sold-out',()=>{
  const report=assessProviders(payload([{code:'korean',displayName:'Korean Air (SkyPass)'}]));
  assert.equal(report.skypass.calendarAdvertised,false);
  assert.deepEqual(report.skypass.missingRequestedCalendarCabins,['economy','business','firstClass']);
});
test('malformed envelopes, duplicate codes and non-array cabins fail closed',()=>{
  for(const value of [{},payload('bad'),{apiVersion:2,providers:[]},payload([korean,korean]),payload([{...korean,priceCalendar:{cabins:'business'}}])])
    assert.throws(()=>assessProviders(value),/INVALID_METADATA/);
});
test('default mode never sends requests, even with configured API credentials',async()=>{
  const result=await checkAwardWallet({...approved,live:false,fetchImpl:offline});
  assert.equal(result.status,'NOT_REQUESTED');
});
test('missing approval, missing API credentials, or newline credentials issue zero requests',async()=>{
  for(const [options,status] of [[{approved:false},'ACCESS_APPROVAL_REQUIRED'],[{password:''},'API_CREDENTIALS_REQUIRED'],[{username:'u\nx'},'INVALID_CREDENTIALS']]){
    const result=await checkAwardWallet({...approved,...options,fetchImpl:offline});
    assert.equal(result.status,status);
  }
});
test('approved check calls only the exact provider metadata endpoint once, never /search',async()=>{
  let calls=0;
  const result=await checkAwardWallet({...approved,fetchImpl:async(url,init)=>{
    calls++;assert.equal(url,'https://ra.awardwallet.com/v1/providers/list');
    assert.equal(init.method,'GET');assert.equal(init.redirect,'error');assert.equal(init.credentials,'omit');
    assert.equal(init.headers['X-Authentication'],'test-api-user:test-api-password');
    assert.equal('body' in init,false);return json(payload([korean]));
  }});
  assert.equal(calls,1);assert.equal(result.status,'METADATA_RECEIVED');
  assert.equal(result.inventoryVerified,false);
  assert.equal(JSON.stringify(result).includes('test-api-password'),false);
});
test('HTTP restrictions and redirects are not retried or mistaken for empty inventory',async()=>{
  for(const [status,expected] of [[401,'API_AUTH_REQUIRED'],[403,'API_ACCESS_DENIED'],[429,'RATE_LIMITED'],[302,'REDIRECT_REFUSED'],[503,'PROVIDER_UNAVAILABLE']]){
    let calls=0;
    const result=await checkAwardWallet({...approved,fetchImpl:async()=>{calls++;return new Response('SECRET_RESPONSE',{status});}});
    assert.equal(result.status,expected);assert.equal(calls,1);
    assert.equal(JSON.stringify(result).includes('SECRET_RESPONSE'),false);
  }
});
test('network errors containing an API key are never echoed',async()=>{
  const result=await checkAwardWallet({...approved,fetchImpl:async()=>{throw Error('test-api-user:test-api-password');}});
  assert.equal(result.status,'NETWORK_ERROR');assert.equal(JSON.stringify(result).includes('test-api'),false);
});
test('HTML and oversized responses are rejected without dumping the body',async()=>{
  for(const fetchImpl of [async()=>new Response('<html>secret</html>',{headers:{'Content-Type':'text/html'}}),async()=>new Response('x'.repeat(270000),{headers:{'Content-Type':'application/json'}})]){
    const result=await checkAwardWallet({...approved,fetchImpl});
    assert.equal(result.status,'INVALID_METADATA');
  }
});
test('a stalled request is bounded and cancelled, with no retry',async()=>{
  let signal,calls=0;
  const result=await checkAwardWallet({...approved,timeoutMs:10,fetchImpl:(_url,init)=>{calls++;signal=init.signal;return new Promise(()=>{});}});
  assert.equal(result.status,'TIMEOUT');assert.equal(signal.aborted,true);assert.equal(calls,1);
});

test('string values cannot accidentally enable live access or approval',async()=>{
  assert.equal((await checkAwardWallet({...approved,live:'false',fetchImpl:offline})).status,'NOT_REQUESTED');
  assert.equal((await checkAwardWallet({...approved,approved:'false',fetchImpl:offline})).status,'ACCESS_APPROVAL_REQUIRED');
});
