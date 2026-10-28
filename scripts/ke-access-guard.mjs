/** Fail fast on a first-party access restriction, without retrying or reading API bodies. */
export function createAccessGuard(page) {
  let failure = null;
  let notify;
  // Resolve with the error, rather than reject, so observations between UI
  // operations cannot create an unhandled promise rejection.
  const restriction = new Promise(resolve => { notify = resolve; });
  const onResponse = response => {
    if (failure) return;
    let host;
    try { host = new URL(response.url()).hostname; } catch { return; }
    const status = response.status();
    if ((host !== 'koreanair.com' && !host.endsWith('.koreanair.com')) ||
        ![401, 403, 429].includes(status)) return;
    failure = Object.assign(new Error(
      `대한항공 접근 제한(HTTP ${status}): 재시도 없이 중단합니다. 좌석 정보는 미조회입니다.`,
    ), { code: 'ACCESS_RESTRICTED', status });
    notify(failure);
  };
  page.on('response', onResponse);
  return {
    run(action) {
      if (failure) return Promise.reject(failure);
      let work;
      try { work = action(); } catch (error) { return Promise.reject(failure || error); }
      return Promise.race([
        restriction.then(error => { throw error; }),
        Promise.resolve(work),
      ]);
    },
    dispose() { page.off('response', onResponse); },
  };
}
