const { test, expect } = require('@playwright/test');

test('Verify New Window', async ({ browser }) => {
    // Create a new browser context and page
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the "New Browser Window" page
    const targetUrl = 'https://qa-practice.netlify.app/window';
    await page.goto(targetUrl);

    // Define selectors and expected values
    const newWindowButtonSelector = '#newWindowBtn';
    const expectedWindowUrl = 'https://qa-practice.netlify.app/web-table.html';
    const expectedWindowTitle = 'QA Practice | Learn with RV';
    const newWindowHeadingSelector = 'h2';
    const expectedHeadingText = 'Table Example';

    // Locate the button to open a new window
    const newWindowButton = page.locator(newWindowButtonSelector);

    // Listen for the new window (page) and click the button
    const [newWindow] = await Promise.all([
        context.waitForEvent('page'), 
        newWindowButton.click(), 
    ]);

    // Wait for the new window to load
    await newWindow.waitForLoadState();

    // Validate the URL of the new window
    expect(newWindow.url()).toBe(expectedWindowUrl);

    // Validate the title of the new window
    const newWindowTitle = await newWindow.title();
    expect(newWindowTitle).toBe(expectedWindowTitle);

    // Validate specific content in the new window
    const newWindowHeading = await newWindow.locator(newWindowHeadingSelector).textContent();
    expect(newWindowHeading).toBe(expectedHeadingText);

    // Close the new window and the main page
    await newWindow.close();
    await page.close();
});
