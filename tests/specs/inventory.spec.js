const { test } = require('../fixtures/test.fixture');
const { expect } = require('@playwright/test');
const testData = require('../../test-data/testData.json');
const { log } = require('../helpers/utils');

test.describe('Inventory Page Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
        const { username, password } = testData.users.standardUser;
        await loginPage.login(username, password);
        await loginPage.waitForPageLoad();
    });

    test('TC008 - Verify Products page displays 6 products', async ({ inventoryPage }) => {
        log('Verifying product count');
        const count = await inventoryPage.getProductCount();
        expect(count).toBe(6);
    });

    test('TC009 - Verify all product names are displayed', async ({ inventoryPage }) => {
        log('Verifying product names');
        const names = await inventoryPage.getAllProductNames();
        expect(names).toContain(testData.products.backpack);
        expect(names).toContain(testData.products.bikeLight);
        expect(names).toContain(testData.products.boltTShirt);
        expect(names).toContain(testData.products.fleeceJacket);
        expect(names).toContain(testData.products.onesie);
        expect(names).toContain(testData.products.redTShirt);
    });

    test('TC010 - Add single product to cart', async ({ inventoryPage }) => {
        log('Adding Backpack to cart');
        await inventoryPage.addProductToCartByName(testData.products.backpack);

        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe(1);

        const isAdded = await inventoryPage.isProductAddedToCart(testData.products.backpack);
        expect(isAdded).toBeTruthy();
    });

    test('TC011 - Add multiple products to cart', async ({ inventoryPage }) => {
        log('Adding multiple products to cart');
        await inventoryPage.addProductToCartByName(testData.products.backpack);
        await inventoryPage.addProductToCartByName(testData.products.bikeLight);
        await inventoryPage.addProductToCartByName(testData.products.onesie);

        const badgeCount = await inventoryPage.getCartBadgeCount();
        expect(badgeCount).toBe(3);
    });

    test('TC012 - Remove product from cart on inventory page', async ({ inventoryPage }) => {
        log('Remove product from cart');
        await inventoryPage.addProductToCartByName(testData.products.backpack);
        expect(await inventoryPage.getCartBadgeCount()).toBe(1);

        await inventoryPage.removeProductFromCartByName(testData.products.backpack);
        expect(await inventoryPage.getCartBadgeCount()).toBe(0);
    });

    test('TC013 - Sort products by Name (A to Z)', async ({ inventoryPage }) => {
        log('Sort A-Z');
        await inventoryPage.sortProducts(testData.sortOptions.nameAZ);
        const names = await inventoryPage.getAllProductNames();
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);
    });

    test('TC014 - Sort products by Name (Z to A)', async ({ inventoryPage }) => {
        log('Sort Z-A');
        await inventoryPage.sortProducts(testData.sortOptions.nameZA);
        const names = await inventoryPage.getAllProductNames();
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);
    });

    test('TC015 - Sort products by Price (low to high)', async ({ inventoryPage }) => {
        log('Sort Price low-high');
        await inventoryPage.sortProducts(testData.sortOptions.priceLowHigh);
        const prices = await inventoryPage.getAllProductPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sorted);
    });

    test('TC016 - Sort products by Price (high to low)', async ({ inventoryPage }) => {
        log('Sort Price high-low');
        await inventoryPage.sortProducts(testData.sortOptions.priceHighLow);
        const prices = await inventoryPage.getAllProductPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    });

    test('TC017 - Logout from the application', async ({ inventoryPage, loginPage }) => {
        log('Testing logout');
        await inventoryPage.logout();
        await loginPage.waitForPageLoad();

        const url = await loginPage.getURL();
        expect(url).toBe('https://www.saucedemo.com/');

        const loginFormVisible = await loginPage.isLoginFormVisible();
        expect(loginFormVisible).toBeTruthy();
    });

    test('TC018 - Click on product to view details', async ({ inventoryPage, productDetailPage }) => {
        log('Viewing product details');
        await inventoryPage.clickProductByName(testData.products.backpack);

        const name = await productDetailPage.getProductName();
        expect(name).toBe(testData.products.backpack);

        const price = await productDetailPage.getProductPrice();
        expect(price).toBeGreaterThan(0);
    });
});
