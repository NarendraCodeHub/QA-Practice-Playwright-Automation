const { test, expect } = require('@playwright/test');

// Verify the page title
test('Verify page title: QA Practice | Learn with RV', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');

    // Verify that the page title matches the expected value
    await expect(page).toHaveTitle('QA Practice | Learn with RV');
});

// Test form submission without entering any fields
test('Verify form validation for empty fields', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');

    // Attempt to submit the form without filling in the fields
    await page.getByRole('button', { name: 'Submit' }).click();

    // Check if the error message is displayed
    const errorMessage = page.getByText('Bad credentials! Please try');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
        "Bad credentials! Please try again! Make sure that you've registered."
    );
});

// Validate the form with invalid credentials
test('Verify form validation for invalid credentials', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');

    // Fill the form with invalid email and password
    await page.locator('#email').fill('test@gmail.com');
    await page.locator('#password').fill('test@123');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Check if the error message is displayed
    const errorMessage = page.getByText('Bad credentials! Please try');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
        "Bad credentials! Please try again! Make sure that you've registered."
    );
});

// Validate login functionality with valid credentials
test('Verify login with valid credentials', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');

    // Fill the form with valid email and password
    await page.locator('#email').fill('admin@admin.com');
    await page.locator('#password').fill('admin123');
    await page.getByRole('button', { name: 'Submit' }).click();

    // Verify the presence of the shopping cart page
    const shoppingCart = page.locator('text=SHOPPING CART');
    await expect(shoppingCart).toBeVisible();
    await expect(shoppingCart).toHaveText('SHOPPING CART');
});
