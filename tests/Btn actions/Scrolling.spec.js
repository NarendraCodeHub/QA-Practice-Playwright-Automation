const { test, expect } = require('@playwright/test');

test('Verify scrolling functionality to find specific text', async ({ page }) => {
    // Define constants for the test
    const targetUrl = 'https://qa-practice.netlify.app/scroll';
    const startingText = 'Starting...';
    const endingText = 'THE END';
    const scrollOffset = 500; // Scroll step in pixels
    const scrollDelay = 200; // Delay between scrolls in milliseconds

    // Navigate to the target page
    await page.goto(targetUrl);

    // Verify the visibility of the starting text
    const startingTextLocator = page.locator(`text=${startingText}`);
    await expect(startingTextLocator).toBeVisible();
    await expect(startingTextLocator).toHaveText(startingText);

    // Scroll down incrementally until the ending text is visible
    const endingTextLocator = page.locator(`text=${endingText}`);
    while (!(await endingTextLocator.isVisible())) {
        // Scroll by the defined offset
        await page.evaluate((offset) => window.scrollBy(0, offset), scrollOffset);

        // Delay between scrolls for smoother scrolling
        await page.waitForTimeout(scrollDelay);
    }

    // Verify the visibility and content of the ending text
    await expect(endingTextLocator).toBeVisible();
    await expect(endingTextLocator).toHaveText(endingText);

    // Close the page
    await page.close();
});
