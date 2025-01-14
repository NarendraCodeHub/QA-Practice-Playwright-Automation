const { test, expect } = require('@playwright/test');
const RecoverPasswordPage = require('../../pages/RecoverPasswordPage');

test.describe('Recover Password with user data', () => {
    let recoverPassword;

    test.beforeEach(async ({ page }) => {
        // Initialize the Recover Password Page object
        recoverPassword = new RecoverPasswordPage(page);

        // Navigate to the Recover Password page
        await recoverPassword.navigate();
    });

    test('should require mandatory fields (empty form)', async ({ page }) => {
        // Submit the form without filling any fields
        await recoverPassword.submitdata();

        // Validate error message for empty fields
        const validationMessage = await recoverPassword.emailInput.evaluate(input => input.validationMessage);
        const browserName = page.context().browser().browserType().name();

        // Browser-specific validation message check
        if (browserName === 'chromium' || browserName === 'firefox') {
            expect(validationMessage).toBe('Please fill out this field.');
        } else if (browserName === 'webkit') {
            expect(validationMessage).toBe('Fill out this field');
        }
    });

    test('should successfully recover password with entered data', async () => {
        // User to enter email
        const email = 'test@gmail.com';

        // Fill the email field with the entered data
        await recoverPassword.emailInput.fill(email);

        // Submit the form
        await recoverPassword.submitdata();

        // Validate success message
        await expect(recoverPassword.successMessage).toBeVisible();
        await expect(recoverPassword.successMessage).toHaveText(
            `An email with the new password has been sent to ${email}. Please verify your inbox!`
        );
    });
});
