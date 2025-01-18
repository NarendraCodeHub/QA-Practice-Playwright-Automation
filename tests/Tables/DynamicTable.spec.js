const { test, expect } = require('@playwright/test');

test('Validate Dyamiv Table', async({page})=> {
    // Navigate to the page 
    await page.goto('https://qa-practice.netlify.app/dynamic-table');

    // Wait for the table to load
    await page.waitForTimeout(2000);
    await page.waitForSelector('#data-table', { state: 'visible', timeout: 10000 });

    // Get all rows in the table body
    const rows = await page.$$('#data-tbody > tr');

    console.log(`Total rows found: ${rows.length}`);

    // Iterate through each row and extract the data
    for (const row of rows) {
        // Get all columns for the current row
        const columns = await row.$$('td');

        // Extract data from each column
        const avatar = await columns[0].$('img');
        const avatarSrc = await avatar.getAttribute('src');
        const firstName = await columns[1].textContent();
        const lastName = await columns[2].textContent();
        const age = await columns[3].textContent();
        const email = await columns[4].textContent();
        const city = await columns[5].textContent();
        const country = await columns[6].textContent();

        console.log({
            Avatar: avatarSrc.trim(),
            FirstName: firstName.trim(),
            LastName: lastName.trim(),
            Age: age.trim(),
            Email: email.trim(),
            City: city.trim(),
            Country: country.trim(),
        });
    }
});
