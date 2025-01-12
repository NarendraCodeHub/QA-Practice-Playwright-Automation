class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        //this.errorMessage = page.getByText('Bad credentials! Please try');
    }

    async navigate() {
        await this.page.goto('https://qa-practice.netlify.app/auth_ecommerce');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async getErrorMessage() {
        return this.page.getByText("Bad credentials! Please try again! Make sure that you've registered.");
    }
}
module.exports = LoginPage;
