const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForElement(locator, timeout = 10000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async click(locator) {
        await this.waitForElement(locator);
        await locator.click();
    }

    async fill(locator, text) {
        await this.waitForElement(locator);
        await locator.clear();
        await locator.fill(text);
    }

    async getText(locator) {
        await this.waitForElement(locator);
        return await locator.textContent();
    }

    async isVisible(locator, timeout = 5000) {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    async getTitle() {
        return await this.page.title();
    }

    async getURL() {
        return this.page.url();
    }

    async takeScreenshot(name) {
        await this.page.screenshot({ path: `test-results/screenshots/${name}.png`, fullPage: true });
    }

    async selectDropdown(locator, value) {
        await locator.selectOption(value);
    }

    async getElementCount(locator) {
        return await locator.count();
    }

    async getAllTexts(locator) {
        return await locator.allTextContents();
    }
}

module.exports = { BasePage };