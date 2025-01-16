const { test, expect } = require('@playwright/test');

test('Validate Hide Element functionality', async ({ page }) => {
    const targetUrl = 'https://qa-practice.netlify.app/show-hide-element';
    const hiddenTextSelector = '#hiddenText';
    const btnToHide = '#showHideBtn';

    // Navigate to the page and validate initial state
    await page.goto(targetUrl);
    const hiddenText = page.locator(hiddenTextSelector);

    await expect(hiddenText).toBeVisible();
    await expect(hiddenText).toHaveText('This text will be hidden');

    // Click on the Hide button and verify the element is hidden
    await page.locator(btnToHide).click();
    await expect(hiddenText).toBeHidden();
});
