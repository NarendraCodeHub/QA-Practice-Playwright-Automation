const { test, expect } = require('@playwright/test');

test('Verify File Upload', async ({ page }) => {

    //Define Selectors 
    const targetURL = 'https://qa-practice.netlify.app/file-upload';
    const fileUploadBtnSelector = '#file_upload';
    const confirmationMsgSelector = '#file_upload_response'; 
    const filePath = './tests/File Upload/solar_system.png';

    // Navigate to the target URL
    await page.goto(targetURL);

    // Upload the file
    await page.locator(fileUploadBtnSelector).setInputFiles(filePath);

    // Wait to ensure the file is uploaded
    await page.waitForTimeout(1000);

    // Click the submit button
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for the confirmation message to appear
    const confirmationMessage = await page.locator(confirmationMsgSelector).textContent();

    // Assert the confirmation message contains the file name
    expect(confirmationMessage).toContain('solar_system.png');
});
