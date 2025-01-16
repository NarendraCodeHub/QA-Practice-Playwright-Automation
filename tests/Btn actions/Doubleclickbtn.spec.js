const { test, expect } = require('@playwright/test');

test('Check Double click button', async ({ page }) => {
    // Navigate to the Double Click on Button Example page
    const targetUrl = 'https://qa-practice.netlify.app/double-click';
    await page.goto(targetUrl);

    // Define the selectors
    const doubleBtnSelector = '#double-click-btn';
    const successMessageSelector = '#double-click-result';

    // Perform the double-click action
    await page.locator(doubleBtnSelector).dblclick();

    // Assert that the success message is visible
    const successMessage = page.locator(successMessageSelector);
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText("Congrats, you double clicked!");

    // Close the page
    await page.close();
});
