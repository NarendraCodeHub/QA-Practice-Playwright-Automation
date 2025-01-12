const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');

test.describe('Login Page Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Verify page title', async () => {
        await expect(loginPage.page).toHaveTitle('QA Practice | Learn with RV');
    });

    test('Validate email field for invalid format', async ({ page }) => {
        await loginPage.emailInput.fill('invalidemail'); // No '@' or domain
        await loginPage.submitButton.click();
        const validationMessage = await loginPage.emailInput.evaluate(input => input.validationMessage);
        const browserName = test.info().project.name;

        // Browser-specific validation message check
        if (browserName === 'chromium') {
            expect(validationMessage).toBe("Please include an '@' in the email address. 'invalidemail' is missing an '@'.");
        } else if (browserName === 'firefox') {
            expect(validationMessage).toBe("Please enter an email address.");
        } else if (browserName === 'webkit') {
            expect(validationMessage).toBe("Enter an email address");
        }
    });

    test('Validate login with invalid credentials', async () => {
        await loginPage.login('test@gmail.com', 'wrongpassword');
        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText("Bad credentials! Please try again! Make sure that you've registered.");
    });

    test('Validate login with valid credentials', async () => {
        await loginPage.login('admin@admin.com', 'admin123');
        const shoppingCart = await loginPage.page.locator('text=SHOPPING CART');
        await expect(shoppingCart).toBeVisible();
        await expect(shoppingCart).toHaveText("SHOPPING CART");
    });
});
