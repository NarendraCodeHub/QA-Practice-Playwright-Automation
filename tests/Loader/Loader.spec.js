const { test, expect } = require('@playwright/test');

test('Verify Loader', async ({ page }) => {
    // Define target URL
    const targetURL = 'https://qa-practice.netlify.app/loader';

    // Navigate to the target URL
    await page.goto(targetURL);

    // Wait for the page to fully load
    await page.waitForLoadState('load');

    // Validate the presence of specific text on the newly loaded page
    const expectedText = 'Some text in my newly loaded page..';
    const textLocator = page.locator(`text=${expectedText}`);

    // Wait for the text to appear
    await textLocator.waitFor({ state: 'visible' });

    // Assert that the text is present on the page
    await expect(textLocator).toBeVisible();
});
