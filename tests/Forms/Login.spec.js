const { test, expect } = require('@playwright/test');

test('Login - Shop',async({page}) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('QA Practice | Learn with RV')
});

test('check-form-validation', async ({ page }) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');

    // Check form validation without entering any fields & click on submit
    await page.getByRole('button', { name: 'Submit' }).click();

    const errorMessage = await page.getByText('Bad credentials! Please try');

    await expect(errorMessage).toBeVisible();

    await expect(errorMessage).toHaveText("Bad credentials! Please try again! Make sure that you've registered.");
});

test('check-form-validation-for-invalid-user-or-password', async ({ page }) => {

    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');

    await page.locator('#email').fill('test@gmail.com');

    await page.locator('#password').fill('test@123');

    await page.getByRole('button', { name: 'Submit' }).click();

    const errorMessage = await page.getByText('Bad credentials! Please try');

    await expect(errorMessage).toBeVisible();

    await expect(errorMessage).toHaveText("Bad credentials! Please try again! Make sure that you've registered.");

});

test('check-form-for-valid-user-or-password', async ({ page }) => {

    await page.goto('https://qa-practice.netlify.app/auth_ecommerce');

    await page.locator('#email').fill('admin@admin.com');

    await page.locator('#password').fill('admin123');

    await page.getByRole('button', { name: 'Submit' }).click();

    const shoppingCart = await page.locator('text=SHOPPING CART'); 

    await expect(shoppingCart).toBeVisible();

    await expect(shoppingCart).toHaveText("SHOPPING CART");

});
