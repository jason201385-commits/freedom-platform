import { expect, test } from './fixtures.js';

test('anyone can read the tester map and filter the advanced area', async ({ page }) => {
  await page.goto('/tester-map');
  await expect(page.getByRole('heading', { level: 1, name: '測試員地圖' })).toBeVisible();
  await expect(page.getByText('我不是JasonC')).toBeVisible();
  await expect(page.getByRole('link', { name: '開啟 GitHub Issues' })).toHaveAttribute('href', 'https://github.com/FreeTWAI/freedom-platform/issues');
  await expect(page.getByText('不要建立真實交易').first()).toBeVisible();
  await page.getByRole('button', { name: 'E 進階' }).click();
  await expect(page.getByRole('heading', { level: 3, name: '我的商店' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: '會員首頁' })).toHaveCount(0);
  await page.getByRole('button', { name: '只看預設關閉' }).click();
  await expect(page.getByRole('heading', { level: 3, name: '私人工作與 AI' })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('heading', { level: 1, name: '測試員地圖' })).toBeVisible();
  await expect(page.getByRole('link', { name: '回自由工坊' })).toBeVisible();
});
