import { test, expect } from '@playwright/test';

test('HTML source has 0 as initial display value', async ({ request }) => {
  const response = await request.get('/');
  const body = await response.text();
  expect(body).toContain('id="display" aria-live="polite">0<');
});

test('displays 0 on load', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#display')).toHaveText('0');
});

test('addition: 3 + 2 = 5', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-value="3"]');
  await page.click('[data-action="operator"][data-value="+"]');
  await page.click('[data-value="2"]');
  await page.click('[data-action="equals"]');
  await expect(page.locator('#display')).toHaveText('5');
});

test('subtraction: 9 - 4 = 5', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-value="9"]');
  await page.click('[data-action="operator"][data-value="-"]');
  await page.click('[data-value="4"]');
  await page.click('[data-action="equals"]');
  await expect(page.locator('#display')).toHaveText('5');
});

test('clear resets display to 0', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-value="5"]');
  await page.click('[data-action="clear"]');
  await expect(page.locator('#display')).toHaveText('0');
});
