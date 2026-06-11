const { BasePage } = require('./BasePage');
const { SAUCE_DEMO_URL } = require('../../config/env.config');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        // Locators
        this.logo = page.locator('.login_logo');
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.errorButton = page.locator('.error-button');
        this.credentialsContainer = page.locator('[data-test="login-credentials"]');
        this.passwordHint = page.locator('[data-test="login-password"]');
    }

    async open() {
        await this.navigateTo(SAUCE_DEMO_URL);
    }

    async login(username, password) {
        await this.fill(this.usernameInput, username);
        await this.fill(this.passwordInput, password);
        await this.click(this.loginButton);
    }

    async getErrorMessage() {
        return await this.getText(this.errorMessage);
    }

    async isErrorDisplayed() {
        return await this.isVisible(this.errorMessage);
    }

    async closeError() {
        await this.click(this.errorButton);
    }

    async isLogoVisible() {
        return await this.isVisible(this.logo);
    }

    async isLoginFormVisible() {
        const usernameVisible = await this.isVisible(this.usernameInput);
        const passwordVisible = await this.isVisible(this.passwordInput);
        const buttonVisible = await this.isVisible(this.loginButton);
        return usernameVisible && passwordVisible && buttonVisible;
    }

    async getUsernameValue() {
        return await this.usernameInput.inputValue();
    }

    async getPasswordValue() {
        return await this.passwordInput.inputValue();
    }
}

module.exports = { LoginPage };
