const { test, expect } = require('@playwright/test');

test('Validate Mouse Hover functionality', async ({ page }) => {
    // Navigate to the target URL
    const targetUrl = 'https://qa-practice.netlify.app/mouse-hover';
    await page.goto(targetUrl);

    // Define the selectors
    const textToHover = '#demo';
    const hoverMessageForText = '#demo';
    const buttonToHover = '#button-hover-over';
    const hoverMessageForButton = 'div.hide';

    // Hover over the text and validate the hover message
    await page.locator(textToHover).hover();
    const textHoverMessage = page.locator(hoverMessageForText);
    await expect(textHoverMessage).toBeVisible();
    await expect(textHoverMessage).toHaveText('HOVERED');

    // Hover over the button and validate the hover message
    await page.locator(buttonToHover).hover();
    const buttonHoverMessage = page.locator(hoverMessageForButton);
    await expect(buttonHoverMessage).toBeVisible();
    await expect(buttonHoverMessage).toHaveText('I am shown when someone hovers over the text above.');

    // Clean up
    await page.close();
});
