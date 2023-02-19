import { test, expect } from '@playwright/test';

test('Go to belong website and click NBN plan button to verify if internet available for aaddress provided', async ({ page }) => {
  await page.goto('https://www.belong.com.au/');
  const url = await page.url();
  expect(url).toContain('belong');
  await expect(page.getByTestId('global-header-header-bar').getByTestId('global-header-button-home')).toBeVisible();
  await expect(page.getByRole('link', { name: 'See nbn plans' })).toBeVisible();
  await page.getByRole('link', { name: 'See nbn plans' }).click();
  await expect(page.getByTestId('address-lookup__input')).toBeVisible();
  const url1 = await page.url();
  expect(url1).toContain('internet');
  await page.getByTestId('address-lookup__input').click();
  await page.getByTestId('address-lookup__input').fill('209/339 Burnley St, Richmond VIC 3121');
  await page.getByRole('option', { name: 'Unit 209 339 Burnley Street, RICHMOND VIC 3121' }).click();
  await expect(page.getByTestId('address-summary-summary')).toHaveText("Unit 209 339 Burnley Street, RICHMOND VIC 3121");
  await page.getByTestId('step-address-lookup__submit-button').click();
  await expect(page.getByRole('heading', { name: 'Great! We can connect you to NBN internet' })).toHaveText("Great! We can connect you to NBN internet");
  const url2 = await page.url();
  expect(url2).toContain('serviceability-details');
});