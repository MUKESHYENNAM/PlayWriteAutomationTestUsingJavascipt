const { test } = require('../fixtures/test.fixture');
const { expect } = require('@playwright/test');
const testData = require('../../test-data/testData.json');
const { log } = require('../helpers/utils');

test.describe('Cart Page Tests', () => {

    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.open();
        const { username, password } = testData.users.standardUser;
        await loginPage.login(username, password);
        await loginPage.waitForPageLoad();
    });

    test('TC019 - Navigate to cart and verify it is empty', async ({ inventoryPage, cartPage }) => {
        log('Checking empty cart');
        await inventoryPage.goToCart();

        const title = await cartPage.getPageTitle();
        expect(title).toBe('Your Cart');

        const isEmpty = await cartPage.isCartEmpty();
        expect(isEmpty).toBeTruthy();
    });

    test('TC020 - Add product and verify it appears in cart', async ({ inventoryPage, cartPage }) => {
        log('Add product and verify in cart');
        await inventoryPage.addProductToCartByName(testData.products.backpack);
        await inventoryPage.goToCart();

        const cartItems = await cartPage.getAllCartItemNames();
        expect(cartItems).toContain(testData.products.backpack);

        const quantity = await cartPage.getItemQuantity(testData.products.backpack);
        expect(quantity).toBe(1);
    });

    test('TC021 - Add multiple products and verify all in cart', async ({ inventoryPage, cartPage }) => {
        log('Add multiple products and verify in cart');
        await inventoryPage.addProductToCartByName(testData.products.backpack);
        await inventoryPage.addProductToCartByName(testData.products.bikeLight);
        await inventoryPage.goToCart();

        const cartItems = await cartPage.getAllCartItemNames();
        expect(cartItems).toHaveLength(2);
        expect(cartItems).toContain(testData.products.backpack);
        expect(cartItems).toContain(testData.products.bikeLight);
    });

    test('TC022 - Remove item from cart', async ({ inventoryPage, cartPage }) => {
        log('Remove item from cart');
        await inventoryPage.addProductToCartByName(testData.products.backpack);
        await inventoryPage.addProductToCartByName(testData.products.bikeLight);
        await inventoryPage.goToCart();

        await cartPage.removeItemByName(testData.products.backpack);
        const cartItems = await cartPage.getAllCartItemNames();
        expect(cartItems).toHaveLength(1);
        expect(cartItems).not.toContain(testData.products.backpack);
    });

    test('TC023 - Continue Shopping button returns to inventory', async ({ inventoryPage, cartPage }) => {
        log('Continue Shopping');
        await inventoryPage.goToCart();
        await cartPage.continueShopping();

        const url = cartPage.page.url();
        expect(url).toContain('inventory');
    });

    test('TC024 - Proceed to checkout from cart', async ({ inventoryPage, cartPage, checkoutPage }) => {
        log('Proceed to checkout');
        await inventoryPage.addProductToCartByName(testData.products.backpack);
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();

        const url = cartPage.page.url();
        expect(url).toContain('checkout-step-one');
    });
});
