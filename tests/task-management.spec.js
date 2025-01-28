const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3001'); // Testing port
});



test.describe('View Product by Categories', () => {
  test('Should allow me view products by category (inclusive of Retail Products)', async ({ page,}) => {

    // Insert code here

  });
});


test.describe('View Product Details', () => {
  test('Should allow me to vie product details', async ({ page }) => {

    // Insert code here

  });
});


test.describe('Change Password', () => {
  test('Should allow me to change password (empty password is not allowed for both old and new password)', async ({ page }) => {

    // Insert code here

  });
});