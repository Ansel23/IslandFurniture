// @ts-check
import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.goto('http://localhost:3001/B/selectCountry.html');
// });


test.describe('View Product by Categories', () => {
  test('Should allow me view products by category (inclusive of Retail Products)', async ({ page,}) => {

    // Insert code here

  });
});


test.describe('View Product Details', () => {
  test('Should allow me to vie product details', async ({ page }) => {
    
  await page.goto('http://localhost:8081/B/selectCountry.html');
  await page.getByRole('link', { name: 'Singapore' }).click();
  await page.getByRole('link', { name: 'All Departments ' }).hover();

  await page.getByRole('link', { name: ' Tables & Desk' }).click();
  await page.getByRole('button', { name: 'More Details' }).click();

  });
});


test.describe('Change Password', () => {
  test('Should allow me to change password (empty password is not allowed for both old and new password)', async ({ page }) => {

    // Insert code here

  });
});