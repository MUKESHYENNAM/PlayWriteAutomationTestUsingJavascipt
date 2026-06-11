const { BasePage } = require('./BasePage');

class InventoryPage extends BasePage {
    constructor(page) {
        super(page);

        // Locators
        this.title = page.locator('[data-test="title"]');
        this.inventoryList = page.locator('[data-test="inventory-list"]');
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        this.itemDescriptions = page.locator('[data-test="inventory-item-desc"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
        this.closeBurgerMenu = page.locator('#react-burger-cross-btn');
        this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
        this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
        this.resetAppState = page.locator('[data-test="reset-sidebar-link"]');
    }

    async getPageTitle() {
        return await this.getText(this.title);
    }

    async getProductCount() {
        return await this.getElementCount(this.inventoryItems);
    }

    async getAllProductNames() {
        return await this.getAllTexts(this.itemNames);
    }

    async getAllProductPrices() {
        const priceTexts = await this.getAllTexts(this.itemPrices);
        return priceTexts.map(p => parseFloat(p.replace('$', '')));
    }

    async addProductToCartByName(productName) {
        const addButton = this.page.locator(`[data-test="inventory-item"]`)
            .filter({ hasText: productName })
            .locator('button', { hasText: 'Add to cart' });
        await this.click(addButton);
    }

    async removeProductFromCartByName(productName) {
        const removeButton = this.page.locator(`[data-test="inventory-item"]`)
            .filter({ hasText: productName })
            .locator('button', { hasText: 'Remove' });
        await this.click(removeButton);
    }

    async getCartBadgeCount() {
        const isVisible = await this.isVisible(this.cartBadge, 2000);
        if (!isVisible) return 0;
        const text = await this.getText(this.cartBadge);
        return parseInt(text);
    }

    async goToCart() {
        await this.click(this.cartLink);
    }

    async sortProducts(sortValue) {
        await this.selectDropdown(this.sortDropdown, sortValue);
    }

    async openBurgerMenu() {
        await this.click(this.burgerMenuButton);
    }

    async logout() {
        await this.openBurgerMenu();
        await this.click(this.logoutLink);
    }

    async resetApp() {
        await this.openBurgerMenu();
        await this.click(this.resetAppState);
        await this.click(this.closeBurgerMenu);
    }

    async clickProductByName(productName) {
        const productLink = this.page.locator('[data-test="inventory-item-name"]', { hasText: productName });
        await this.click(productLink);
    }

    async isProductAddedToCart(productName) {
        const removeButton = this.page.locator(`[data-test="inventory-item"]`)
            .filter({ hasText: productName })
            .locator('button', { hasText: 'Remove' });
        return await this.isVisible(removeButton, 2000);
    }
}

module.exports = { InventoryPage };
