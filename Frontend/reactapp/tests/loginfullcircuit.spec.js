import { test, expect } from '@playwright/test';

test('loginfullcircuit', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Account' }).click();
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').fill('first.last@email.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
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
  await page.getByRole('link', { name: 'Wishlist' }).click();
  await page.getByText('Shawl 3A comfortable and').click();
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('table').click();
  await page.getByText('Shawl').click();
  await page.getByRole('img', { name: 'Shawl' }).click();
  await page.getByRole('button', { name: 'Price Breakdown' }).click();
  await page.getByRole('button', { name: 'Cart Items' }).click();
  await page.getByRole('heading', { name: 'Total Price: $' }).click();
  await page.getByRole('button', { name: 'X' }).click();
  await page.getByRole('link', { name: 'Wishlist' }).click();
  await page.getByRole('button', { name: 'Remove from Wishlist' }).click();
  await page.getByRole('heading', { name: 'Your Wishlist is Currently' }).click();
  await page.getByRole('link', { name: 'Account' }).click();
  await page.getByRole('button', { name: 'Log out' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
});