const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
    constructor(page) {
        super(page);

        // Locators
        this.title = page.locator('[data-test="title"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.cartItemNames = page.locator('[data-test="inventory-item-name"]');
        this.cartItemPrices = page.locator('[data-test="inventory-item-price"]');
        this.cartItemQuantities = page.locator('[data-test="item-quantity"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async getPageTitle() {
        return await this.getText(this.title);
    }

    async getCartItemCount() {
        return await this.getElementCount(this.cartItems);
    }

    async getAllCartItemNames() {
        return await this.getAllTexts(this.cartItemNames);
    }

    async getAllCartItemPrices() {
        const priceTexts = await this.getAllTexts(this.cartItemPrices);
        return priceTexts.map(p => parseFloat(p.replace('$', '')));
    }

    async removeItemByName(itemName) {
        const removeButton = this.page.locator('[data-test="inventory-item"]')
            .filter({ hasText: itemName })
            .locator('button', { hasText: 'Remove' });
        await this.click(removeButton);
    }

    async continueShopping() {
        await this.click(this.continueShoppingButton);
    }

    async proceedToCheckout() {
        await this.click(this.checkoutButton);
    }

    async isCartEmpty() {
        const count = await this.getCartItemCount();
        return count === 0;
    }

    async getItemQuantity(itemName) {
        const quantity = this.page.locator('[data-test="inventory-item"]')
            .filter({ hasText: itemName })
            .locator('[data-test="item-quantity"]');
        const text = await this.getText(quantity);
        return parseInt(text);
    }
}

module.exports = { CartPage };
