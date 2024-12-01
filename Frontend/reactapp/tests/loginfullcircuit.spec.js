import { test, expect } from '@playwright/test';

test('loginfullcircuit', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Account' }).click();
    await page.getByPlaceholder('Email Address').click();
    await page.getByPlaceholder('Email Address').fill('first.last@email.com');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Wishlist' }).click();
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
    await page.locator('#regCarousel div').filter({ hasText: 'Shawl 3A comfortable and' }).first().click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Add to Wishlist' }).click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('link', { name: 'Wishlist' }).click();
    await page.getByRole('button', { name: 'Remove from Wishlist' }).click();
    await page.getByRole('link', { name: 'Cart' }).click();
    await page.getByRole('button', { name: 'X' }).click();
    await page.getByRole('link', { name: 'Account' }).click();
    await page.getByRole('button', { name: 'Log out' }).click();
    await page.getByRole('link', { name: 'Home' }).click();
  });




// additional: getByRole('heading', { name: 'Your Wishlist is Currently' }), getByRole('heading', { name: 'Your cart is currently empty' }), 
// getByText('Your cart is currently empty. Add some items to start shopping!'), locator('#regCarousel div').first(), getByRole('table')
// npx playwright test ./tests/loginfullcircuit