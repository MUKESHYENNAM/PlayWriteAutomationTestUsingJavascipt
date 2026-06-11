const { BasePage } = require('./BasePage');

class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);

        // Step One - Your Information
        this.stepOneTitle = page.locator('[data-test="title"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');

        // Step Two - Overview
        this.overviewTitle = page.locator('[data-test="title"]');
        this.overviewItems = page.locator('[data-test="inventory-item"]');
        this.overviewItemNames = page.locator('[data-test="inventory-item-name"]');
        this.overviewItemPrices = page.locator('[data-test="inventory-item-price"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');

        // Complete
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
        this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    }

    // Step One methods
    async fillCheckoutInfo(firstName, lastName, postalCode) {
        if (firstName) await this.fill(this.firstNameInput, firstName);
        if (lastName) await this.fill(this.lastNameInput, lastName);
        if (postalCode) await this.fill(this.postalCodeInput, postalCode);
    }

    async clickContinue() {
        await this.click(this.continueButton);
    }

    async clickCancel() {
        await this.click(this.cancelButton);
    }

    async getErrorMessage() {
        return await this.getText(this.errorMessage);
    }

    async isErrorDisplayed() {
        return await this.isVisible(this.errorMessage);
    }

    // Step Two methods
    async getOverviewItemCount() {
        return await this.getElementCount(this.overviewItems);
    }

    async getSubtotal() {
        const text = await this.getText(this.subtotalLabel);
        return parseFloat(text.replace('Item total: $', ''));
    }

    async getTax() {
        const text = await this.getText(this.taxLabel);
        return parseFloat(text.replace('Tax: $', ''));
    }

    async getTotal() {
        const text = await this.getText(this.totalLabel);
        return parseFloat(text.replace('Total: $', ''));
    }

    async clickFinish() {
        await this.click(this.finishButton);
    }

    // Complete page methods
    async getCompleteHeader() {
        return await this.getText(this.completeHeader);
    }

    async getCompleteText() {
        return await this.getText(this.completeText);
    }

    async clickBackHome() {
        await this.click(this.backHomeButton);
    }

    async isOrderComplete() {
        return await this.isVisible(this.completeHeader);
    }
}

module.exports = { CheckoutPage };
