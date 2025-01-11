const { test, expect } = require('@playwright/test');

test('Login - Shop',async({page}) => {
    await page.goto('https://qa-practice.netlify.app/auth_ecommerce')

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle('QA Practice | Learn with RV')
});
