/** Select one public airport autocomplete option, using its accessible name. */
export async function selectAirport(page, code, from) {
  const label = from ? '출발지 검색' : '도착지 검색';
  await page.getByRole('button', {
    name: from ? 'From 출발지' : 'To 도착지', exact: true,
  }).click();
  const input = page.getByRole('combobox', { name: label, exact: true });
  await input.fill('');
  await input.pressSequentially(code, { delay: 70 });
  // Airport codes may be in aria-label, not visible textContent. No .first():
  // an ambiguous match must fail instead of choosing a different airport.
  const option = page.getByRole('option', { name: new RegExp('^' + code + '\\b', 'u') });
  await option.waitFor({ state: 'visible', timeout: 10000 });
  await option.click();
}
