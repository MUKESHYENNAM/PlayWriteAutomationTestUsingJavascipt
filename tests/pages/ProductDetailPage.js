const { BasePage } = require('./BasePage');

class ProductDetailPage extends BasePage {
    constructor(page) {
        super(page);

        // Locators
        this.productName = page.locator('[data-test="inventory-item-name"]');
        this.productDescription = page.locator('[data-test="inventory-item-desc"]');
        this.productPrice = page.locator('[data-test="inventory-item-price"]');
        this.productImage = page.locator('img.inventory_details_img');
        this.addToCartButton = page.locator('button', { hasText: 'Add to cart' });
        this.removeButton = page.locator('button', { hasText: 'Remove' });
        this.backButton = page.locator('[data-test="back-to-products"]');
    }

    async getProductName() {
        return await this.getText(this.productName);
    }

    async getProductDescription() {
        return await this.getText(this.productDescription);
    }

    async getProductPrice() {
        const priceText = await this.getText(this.productPrice);
        return parseFloat(priceText.replace('$', ''));
    }

    async addToCart() {
        await this.click(this.addToCartButton);
    }

    async removeFromCart() {
        await this.click(this.removeButton);
    }

    async goBackToProducts() {
        await this.click(this.backButton);
    }

    async isAddToCartVisible() {
        return await this.isVisible(this.addToCartButton, 2000);
    }

    async isRemoveVisible() {
        return await this.isVisible(this.removeButton, 2000);
    }
}

module.exports = { ProductDetailPage };
