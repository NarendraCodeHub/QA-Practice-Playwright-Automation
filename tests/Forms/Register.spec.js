const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const RegisterPage = require('../../pages/RegisterPage');

let userData = {}; 

test.describe('Register Page Tests with Random Data', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        // Initialize the RegisterPage object
        registerPage = new RegisterPage(page);

        // Navigate to the registration page
        await registerPage.navigate();
    });

    test('should require mandatory fields (empty form)', async () => {
        // Submit the form without filling any fields
        await registerPage.submitForm();

        // Validate error message for empty fields
        const validationMessage = await registerPage.emailInput.evaluate(input => input.validationMessage);
        const browserName = test.info().project.name;

        if (browserName === 'chromium') {
            expect(validationMessage).toBe("Please fill out this field.");    
        } else if (browserName === 'firefox') {
            expect(validationMessage).toBe("Please fill out this field.");    
        } else if (browserName === 'webkit') {
            expect(validationMessage).toBe("Fill out this field");    
        }
    });

    test('should successfully register with valid data', async () => {
        // Generate random user data with a valid password
        const randomFirstName = faker.person.firstName();
        const randomLastName = faker.person.lastName();
        const randomPhone = faker.phone.number('##########');
        const randomCountry = 'United States of America';
        const randomEmail = faker.internet.email(randomFirstName, randomLastName);
        const randomPassword = faker.internet.password(12, true);

        // Store user data for later use
        userData = {
            firstName: randomFirstName,
            lastName: randomLastName,
            phone: randomPhone,
            country: randomCountry,
            email: randomEmail,
            password: randomPassword,
        };

        // Log the generated data
        console.log('User successfully registered with the following details:');
        console.table(userData);

        // Fill out the registration form
        await registerPage.fillRegistrationForm({
            firstName: randomFirstName,
            lastName: randomLastName,
            phone: randomPhone,
            country: randomCountry,
            email: randomEmail,
            password: randomPassword,
            acceptTerms: true,
        });

        // Submit the form
        await registerPage.submitForm();

        // Validate success message
        await expect(registerPage.successMessage).toBeVisible();
        await expect(registerPage.successMessage).toHaveText('The account has been successfully created!');    });
});
