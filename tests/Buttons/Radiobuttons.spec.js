const { test, expect } = require('@playwright/test');

test('Verify Radio Buttons', async ({ page }) => {
    // Navigate to the radio buttons page
    await page.goto('https://qa-practice.netlify.app/radiobuttons');

    // Locate the Radio Buttons
    const radioButton1 = page.locator('#radio-button1');
    const radioButton2 = page.locator('#radio-button2');
    const radioButton3 = page.locator('#radio-button3');
    const radioButton4Disabled = page.locator('#radio-button4');

    // Click on Radio Buttons and verify they are selected
    await radioButton1.click();
    await expect(radioButton1).toBeChecked();

    await radioButton2.click();
    await expect(radioButton2).toBeChecked();

    await radioButton3.click();
    await expect(radioButton3).toBeChecked();

    // Verify the disabled radio button
    await expect(radioButton4Disabled).toBeDisabled();
});
