import { test, expect } from '@playwright/test';

test('Verify Calendar Functionality', async ({ page }) => {
    // Test Data
    const targeturl = 'https://qa-practice.netlify.app/calendar';
    const rangeStartDate = '1';
    const rangeEndDate = '10';
    const expectedRangeValue = '01/01/2018 - 01/10/2018';

    // Get today's date
    const today = new Date();
    const todayDate = today.getDate().toString();
    const todayMonthYear = today.toLocaleString('default', { month: 'long', year: 'numeric' }); 

    // Format today's date to MM/DD/YYYY
    const formattedTodayDate = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}/${today.getFullYear()}`;

    // Navigate to the calendar page
    await page.goto(targeturl);

    // Range Date Picker Example
    await page.locator('#range-date-calendar').click();
    await page.getByRole('cell', { name: rangeStartDate, exact: true }).first().click();
    await page.getByRole('cell', { name: rangeEndDate }).first().click();
    await page.getByRole('button', { name: 'Apply' }).click();

    // Basic Date Picker Example
    await page.getByPlaceholder('Pick a date').click();

    // Wait for the correct month/year to be displayed
    while (true) {
        // Filter to find the correct 'th.datepicker-switch' element for month and year
        const visibleHeader = await page.locator('th.datepicker-switch')
            .filter({ hasText: /^[A-Za-z]+\s\d{4}$/ }) 
            .first();

        const calendarHeader = await visibleHeader.textContent();
        if (calendarHeader?.trim() === todayMonthYear) break;

        await page.locator('button.next').click();
    }

    // Wait for the target day to be visible and click it
    const dayLocator = page.locator('td.day').filter({ hasText: todayDate });
    await dayLocator.waitFor({ state: 'visible' });
    await dayLocator.click();

    // Validate date picker interactions
    await expect(page.getByPlaceholder('Pick a date')).toHaveValue(formattedTodayDate);

    // Assert the selected range date values
    await expect(page.locator('#range-date-calendar')).toHaveValue(expectedRangeValue);
});
