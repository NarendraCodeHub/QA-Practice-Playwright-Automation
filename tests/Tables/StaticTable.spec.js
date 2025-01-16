const { test, expect } = require('@playwright/test');

test('Validate table data in People Table', async ({ page }) => {
    const targetUrl = 'https://qa-practice.netlify.app/web-table';
    const tableSelector = '#peopleTable';
    const rowsSelector = `${tableSelector} tbody tr`;

    await page.goto(targetUrl);

    // Wait for the table rows to load and be visible
    await page.waitForSelector(rowsSelector, { state: 'visible' });

    // Validate the number of rows in the table
    const rows = page.locator(rowsSelector);
    await expect(rows).toHaveCount(5); // Verify there are 5 rows

    // Validate specific cell data in the table
    const firstRow = rows.nth(0);
    await expect(firstRow.locator('td:nth-child(2)')).toHaveText('Mark');  
    await expect(firstRow.locator('td:nth-child(3)')).toHaveText('Otto');  
    await expect(firstRow.locator('td:nth-child(4)')).toHaveText('mo@email.com');  

    const secondRow = rows.nth(1);
    await expect(secondRow.locator('td:nth-child(2)')).toHaveText('Jacob');
    await expect(secondRow.locator('td:nth-child(3)')).toHaveText('Thornton');
    await expect(secondRow.locator('td:nth-child(4)')).toHaveText('jacob_t@yahoo.com');

    const thirdRow = rows.nth(2);
    await expect(thirdRow.locator('td:nth-child(2)')).toHaveText('Larry');
    await expect(thirdRow.locator('td:nth-child(3)')).toHaveText('Bow');
    await expect(thirdRow.locator('td:nth-child(4)')).toHaveText('lbow@gmail.com');

    const fourthRow = rows.nth(3);
    await expect(fourthRow.locator('td:nth-child(2)')).toHaveText('Bobby');
    await expect(fourthRow.locator('td:nth-child(3)')).toHaveText('Spencer');
    await expect(fourthRow.locator('td:nth-child(4)')).toHaveText('bobby_23@gmail.com');

    const fifthRow = rows.nth(4);
    await expect(fifthRow.locator('td:nth-child(2)')).toHaveText('Mark');
    await expect(fifthRow.locator('td:nth-child(3)')).toHaveText('Icarus');
    await expect(fifthRow.locator('td:nth-child(4)')).toHaveText('el_icarus@yahoo.com');

});
