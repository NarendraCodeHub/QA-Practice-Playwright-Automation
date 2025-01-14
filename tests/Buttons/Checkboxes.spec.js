const { test, expect } = require('@playwright/test');

test('Verify Checkboxes and Reset Functionality', async ({ page }) => {
    // Navigate to the checkbox page
    await page.goto('https://qa-practice.netlify.app/checkboxes');

    // Locate the checkboxes
    const checkbox1 = page.locator('#checkbox1');
    const checkbox2 = page.locator('#checkbox2');
    const checkbox3 = page.locator('#checkbox3');

    // Locate the Reset button
    const resetButton = page.locator('[class*="btn btn-primary"]');

    // Click on all checkboxes and verify they are selected
    await checkbox1.check();
    await checkbox2.check();
    await checkbox3.check();

    // Assert all checkboxes are selected
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();
    await expect(checkbox3).toBeChecked();

    //Click the Reset button and verify all checkboxes are deselected
    await resetButton.click();

    // Assert all checkboxes are not selected after reset
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).not.toBeChecked();
    await expect(checkbox3).not.toBeChecked();
});
