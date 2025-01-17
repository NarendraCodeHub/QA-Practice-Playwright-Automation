const { test, expect } = require('@playwright/test');

test('Check Simple and Multi-Level Dropdown functionality', async ({ page }) => {
    // Define for selectors
    const targetUrl = 'https://qa-practice.netlify.app/dropdowns';
    const dropdownMenuSelector = '#dropdown-menu';
    const dropdownBtnSelector = '#multi-level-dropdown-btn';
    const someActionOptionSelector = '//a[text()="Some action"]';
    const someOtherOptionSelector = '//a[text()="Some other action"]';
    const hoverMeSelector = '//a[text()="Hover me for more options"]';
    const hoverEvenMoreSelector = '//a[text()="Even More.."]';
    const hoverAnotherLevelSelector = '//a[text()="another level"]';

    // Second Level Options
    const secondLevelSelectors = [
        '//a[text()="Second level - 1"]',
        '//a[text()="Second level - 2"]',
        '//a[text()="Second level -3"]',
    ];

    // Third Level Options
    const thirdLevelSelectors = [
        '//a[text()="3rd level - 1"]',
        '//a[text()="3rd level - 2"]',
    ];

    // Fourth Level Options
    const fourthLevelSelectors = [
        '//a[text()="4th level - 1"]',
        '//a[text()="4th level - 2"]',
        '//a[text()="4th level - 3"]',
    ];

    // Navigate to the page
    await page.goto(targetUrl);

    // Wait for dropdown to be visible and select a country
    await page.waitForSelector(dropdownMenuSelector);
    const countryValue = 'India';
    await page.selectOption(dropdownMenuSelector, { value: countryValue });

    // Validate selection
    const selectedValue = await page.$eval(dropdownMenuSelector, el => el.value);
    expect(selectedValue).toBe(countryValue);
    console.log(`Successfully selected: ${countryValue}`);

    // Handle Dropdown Button and Options
    const dropdownBtn = page.locator(dropdownBtnSelector);
    await dropdownBtn.click();
    await page.locator(someActionOptionSelector).click();
    await dropdownBtn.click();
    await page.locator(someOtherOptionSelector).click();
    await dropdownBtn.click();

    // Function to handle hover actions and validation
    const hoverAndValidate = async (hoverSelector, levelSelectors, levelName) => {
        const hoverElement = page.locator(hoverSelector);
        await hoverElement.hover();
        await page.waitForTimeout(1000); // Wait for the next level to appear

        for (const selector of levelSelectors) {
            const levelOption = page.locator(selector);
            await levelOption.waitFor({ state: 'visible', timeout: 10000 });
            if (await levelOption.isVisible()) {
                console.log(`${levelName} option visible: ${await levelOption.textContent()}`);
            } else {
                console.error(`${levelName} option is not visible`);
            }
        }
    };

    // Hover over each level and validate visibility
    await hoverAndValidate(hoverMeSelector, secondLevelSelectors, 'Second level');
    await hoverAndValidate(hoverEvenMoreSelector, thirdLevelSelectors, 'Third level');
    await hoverAndValidate(hoverAnotherLevelSelector, fourthLevelSelectors, 'Fourth level');
});
