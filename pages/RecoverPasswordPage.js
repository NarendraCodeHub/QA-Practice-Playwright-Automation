class RecoverPasswordPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.recoverpasswordButton = page.locator('[class*="btn btn-primary"]');
        this.successMessage = page.locator('#message');
        this.errorMessage = page.locator('#errorMessage');
    }

    async navigate() {
        await this.page.goto('https://qa-practice.netlify.app/recover-password');
    }

   
    async submitdata() {
        await this.recoverpasswordButton.click();
    }
}

module.exports = RecoverPasswordPage;
