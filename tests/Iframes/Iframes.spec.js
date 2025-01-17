const { test, expect } = require('@playwright/test');

test('Verify functionality inside the iframe', async ({ page }) => {

    // Define for selectors
    const targetURL = 'https://qa-practice.netlify.app/iframe';
    const iframeSelector = '#iframe-checkboxes';
    const learnMoreBtn = '#learn-more';
    const showTextMessage = '#show-text';
    const expectedText = `This text appears when you click the "Learn more" button`;

    // Navigate to the target URL
    await page.goto(targetURL);

    // Wait for iframe and switch context
    const frame = page.frameLocator(iframeSelector);

    // Ensure the 'Learn More' button is visible and click it
    const learnMoreButton = frame.locator(learnMoreBtn);
    await learnMoreButton.waitFor({ state: 'visible' });
    await learnMoreButton.click();

    // Verify the success message
    const successMessage = frame.locator(showTextMessage);
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText(expectedText);

});
