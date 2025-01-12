class RegisterPage {
    constructor(page) {
        this.page = page;
        this.firstnameInput = page.locator('#firstName');
        this.lastnameInput = page.locator('#lastName');
        this.phonenumberInput = page.locator('#phone');
        this.countryDropdown = page.locator('#countries_dropdown_menu');
        this.emailInput = page.locator('#emailAddress');
        this.passwordInput = page.locator('#password');
        this.term_conditionCheckbox = page.locator('#exampleCheck1');
        this.registerButton = page.locator('#registerBtn');
        this.successMessage = page.locator('#message');
        this.errorMessage = page.locator('#errorMessage');
    }

    async navigate() {
        await this.page.goto('https://qa-practice.netlify.app/register');
    }

    async fillRegistrationForm(data) {
        await this.firstnameInput.fill(data.firstName);
        await this.lastnameInput.fill(data.lastName);
        await this.phonenumberInput.fill(data.phone);

        // Wait for dropdown options to load
        await this.countryDropdown.waitFor({ state: 'visible' });

        // Use selectOption with label or value
        await this.countryDropdown.selectOption({ label: data.country });

        await this.emailInput.fill(data.email);
        await this.passwordInput.fill(data.password);

        if (data.acceptTerms) {
            await this.term_conditionCheckbox.check();
        }
    }

    async submitForm() {
        await this.registerButton.click();
    }
}

module.exports = RegisterPage;
