// @ts-check
import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.goto('http://localhost:3001/B/selectCountry.html');
// });


test.describe('View Product by Categories', () => {
  test('Should allow me view products by category (inclusive of Retail Products)', async ({ page }) => {

    // Step 1: Navigate to the website
    await page.goto('http://localhost:8081/B/selectCountry.html');

    // Step 2: Select country (Singapore)
    await page.getByRole('link', { name: 'Singapore' }).click();

    // Step 3: Hover over categories
    await page.getByRole('link', { name: 'All Departments ' }).hover();

    // Step 4: Loop over all categories
    for (const category of await page.locator('.cats li').all()){

      // Step 5: Click on category
      await category.click();

      // Step 6: Return to all department
      await page.getByRole('link', { name: 'All Departments ' }).hover();
    }

  });
});


test.describe('View Product Details', () => {
  test('Should allow me to view product details', async ({ page }) => {
    
    // Step 1: Navigate to the website
    await page.goto('http://localhost:8081/B/selectCountry.html');

    // Step 2: Select country (Singapore)
    await page.getByRole('link', { name: 'Singapore' }).click();

    // Step 3: Hover over categories
    await page.getByRole('link', { name: 'All Departments ' }).hover();

    // Step 4: Loop over all categories
    for (const category of await page.locator('.cats li').all()){

      // Step 5: Click on category
      await category.click();

      // Step 6: Loop over all products
      for (const button of await page.getByRole('button', { name: 'More Details' }).all()){
        // Step 7: Click on more details
        await button.click();
        
        // Step 8: Expect to see product details
        await expect(page.getByRole('main').locator('div').filter({hasText: 'Description Category:'}).nth(2)).toBeVisible();
        
        // Step 9: Return to category
        await page.getByRole('link', { name: 'All Departments ' }).hover();
        await category.click();
      }

      // Step 10: Return to all departments
      await page.getByRole('link', { name: 'All Departments ' }).hover();
    }

  });
});


test.describe('Change Password Flow with Validation Checks', () => {
  
  test('Should change password successfully and prevent empty password input', async ({ page }) => {

    const email = 'ansellow77@gmail.com';
    const oldPassword = 'password';
    const newPassword = 'test';

    // Step 1: Navigate to the website
    await page.goto('http://localhost:8081/B/selectCountry.html');

    // Step 2: Select country (Singapore)
    await page.getByRole('link', { name: 'Singapore' }).click();

    // Step 3: Log in with old password
    await login(page, email, oldPassword);

    // Ensure login is successful
    await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();

    // Step 4: Log out
    await page.getByRole('link', { name: ' Logout' }).click();

    // Step 5: Navigate to change password page
    await page.getByRole('link', { name: '(Change Password?)' }).click();

    // Step 6: Successfully change password
    await changePassword(page, email, newPassword);

    // Step 7: Log out again to test new password
    await page.getByRole('link', { name: ' Login/Register' }).click();

    // Step 9: Log in with new password
    await login(page, email, newPassword);

    // Ensure login is successful with new password
    await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();

 // Step 10: Log out again
 await page.getByRole('link', { name: ' Logout' }).click();

    // Step 11: Navigate to change password page again and ensure empty password input is not allowed
    await page.getByRole('link', { name: '(Change Password?)' }).click();
    await testEmptyPasswordChange(page, email);

   

    // Step 12: Ensure empty password login prevents submission
    await testEmptyLogin(page);

    // Step 13: Reset password back to old password (Cleanup Step)
    await page.getByRole('link', { name: '(Change Password?)' }).click();
    await changePassword(page, email, oldPassword);

    console.log("Test case completed successfully. Password reset to old password.");
  });

  // Helper function for logging in
  async function login(page, email, password) {
    await page.getByRole('link', { name: ' Login/Register' }).click();
    await page.locator('#emailLogin').fill(email);
    await page.locator('#passwordLogin').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // Ensure login was successful by checking logout button
    await expect(page.getByRole('link', { name: ' Logout' })).toBeVisible();
  }



  // Helper function for changing password
  async function changePassword(page, email, newPassword) {
    await page.locator('#email').fill(email);
    
    const passwordInputs = page.getByRole('textbox');
    await passwordInputs.first().fill(newPassword);  // New password
    await passwordInputs.nth(1).fill(newPassword);   // Confirm new password
    
    // Listen for alert dialog
    let alertMessage = "";
    page.once('dialog', async dialog => {
      alertMessage = dialog.message();
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait a moment to ensure alert is captured
    await page.waitForTimeout(500);

    // Verify alert message
    expect(alertMessage).toContain('Password changed successfully.');
  }

  // Helper function to check empty password field during password change
  async function testEmptyPasswordChange(page, email) {
    await page.locator('#email').fill(email);
    
    const passwordInputs = page.getByRole('textbox');
    await passwordInputs.first().fill('');  // Leave new password empty
    await passwordInputs.nth(1).fill('');   // Leave confirm password empty
    
    // Try submitting the form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Expect the browser to prevent submission due to `required` attribute
    await expect(passwordInputs.first()).toHaveAttribute('required');
    await expect(passwordInputs.nth(1)).toHaveAttribute('required');
  }

  // Helper function to check empty password field during login
  async function testEmptyLogin(page) {
    await page.getByRole('link', { name: ' Login/Register' }).click();
    await page.locator('#emailLogin').fill('ansellow77@gmail.com');
    await page.locator('#passwordLogin').fill('');

    // Try submitting the login form
    await page.getByRole('button', { name: 'Login' }).click();

    // Expect browser to prevent login submission due to `required` attribute
    await expect(page.locator('#passwordLogin')).toHaveAttribute('required');
  }

});