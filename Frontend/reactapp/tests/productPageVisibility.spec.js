import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.locator('#regCarousel div').filter({ hasText: 'Shawl 3A comfortable and' }).first().click();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Slide' })).toBeVisible();
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - link "Shawl 1 Shawl 1":
      - heading "Shawl 1" [level=3]
      - img "Shawl 1"
    `);
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - link "Shawl 2 Shawl 2":
      - heading "Shawl 2" [level=3]
      - img "Shawl 2"
    `);
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - link "Shawl 4 Shawl 4":
      - heading "Shawl 4" [level=3]
      - img "Shawl 4"
    `);
    await expect(page.locator('#root')).toContainText('Shawl 3A comfortable and elegant shawl for all seasons.');
    await expect(page.locator('#root')).toMatchAriaSnapshot(`
    - paragraph: "/Price: \\\\$\\\\d+\\\\.\\\\d+/"
    - button "Add to Cart"
    - button "Add to Wishlist"
    `);
    await expect(page.locator('#root')).toContainText('Price: $19.99');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Account' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Wishlist' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(page.getByText('Home☰AccountWishlistCart')).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('img', { name: 'Slide' })).toBeVisible();
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByRole('img', { name: 'Slide' })).toBeVisible();
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByRole('img', { name: 'Slide' })).toBeVisible();
});