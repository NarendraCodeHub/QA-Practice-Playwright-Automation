const { test, expect } = require('@playwright/test');

test('Verify New Browser Tab', async ({ browser }) => {
    // Create a new browser context and a page
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to the "New Browser Tab" page
    const targetUrl = 'https://qa-practice.netlify.app/tab';
    await page.goto(targetUrl);

    // Locate the button to open a new tab
    const newTabButtonSelector = '//a[text()="Press me - New Tab"]';
    const newTabButton = page.locator(newTabButtonSelector);

    // Click the button and wait for the new tab to open
    const [newTab] = await Promise.all([
        context.waitForEvent('page'), 
        newTabButton.click(), 
    ]);

    // Ensure the new tab is fully loaded
    await newTab.waitForLoadState();

    // Validate the URL of the new tab
    const expectedUrl = 'https://qa-practice.netlify.app/web-table';
    expect(newTab.url()).toContain(expectedUrl);

    // Validate the title of the new tab
    const expectedTitle = 'QA Practice | Learn with RV';
    const pageTitle = await newTab.title();
    expect(pageTitle).toBe(expectedTitle);

    // Validate specific content in the new tab 
    const headingSelector = 'h2';
    const expectedHeadingText = 'Table Example';
    const headingText = await newTab.locator(headingSelector).textContent();
    expect(headingText).toBe(expectedHeadingText);

    // Close the new tab and the main page
    await newTab.close();
    await page.close();
});
