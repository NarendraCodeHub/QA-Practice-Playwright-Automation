const { test, expect } = require('@playwright/test');

test('Verify Pagination Functionality', async ({ page }) => {
    // Define constants
    const targetURL = 'https://qa-practice.netlify.app/pagination';
    const pageSelectMessageLocator = '#pageResult';

    // Navigate to the target URL
    await page.goto(targetURL);

    // Function to validate page selection
    const validatePageSelection = async (pageNumber, expectedText) => {
        await page.getByRole('link', { name: pageNumber }).click(); 
        const message = page.locator(pageSelectMessageLocator); 
        await expect(message).toBeVisible(); 
        await expect(message).toHaveText(expectedText); 
    };

    // Validate clicking on individual pages
    await validatePageSelection('1', 'You clicked page no. 1');
    await validatePageSelection('2', 'You clicked page no. 2');
    await validatePageSelection('3', 'You clicked page no. 3');

    // Validate clicking on the "Next" button
    await validatePageSelection('Next', 'You clicked the "Next" button');
});
