const { test, expect } = require('@playwright/test');

test('Handle Alert and Confirm dialogs', async ({ page }) => {
    // Define selectors
    const targetURL = 'https://qa-practice.netlify.app/alerts';
    const alertBtn = '#alert-btn';
    const confirmBtn = '#confirm-btn';

    // Navigate to the target URL
    await page.goto(targetURL);

    // Handle dialog events
    page.on('dialog', async (dialog) => {
        const message = dialog.message();
        console.log(`Dialog message: ${message}`);

        if (message.includes('alert')) {
            await dialog.accept(); 
        } else if (message.includes('OK')) {
            if (message.includes('Cancel')) {
                await dialog.dismiss(); 
            } else {
                await dialog.accept(); 
            }
        }
    });

    // Trigger the alert dialog
    await page.locator(alertBtn).click();

    // Wait to simulate interaction
    await page.waitForTimeout(1000);

    // Ensure the confirm button is ready before clicking
    await page.locator(confirmBtn).waitFor({ state: 'visible' }); 
    await page.locator(confirmBtn).waitFor({ state: 'attached' }); 
    await page.locator(confirmBtn).click();

    // Wait to simulate interaction
    await page.waitForTimeout(1000);

    // Trigger the confirm dialog again
    await page.locator(confirmBtn).click();
});
