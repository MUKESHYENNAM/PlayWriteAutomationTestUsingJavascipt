const { test } = require('../fixtures/test.fixture');
const { expect } = require('@playwright/test');
const testData = require('../../test-data/testData.json');
const { log } = require('../helpers/utils');

test.describe('Product Detail Page Tests', () => {

    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.open();
        const { username, password } = testData.users.standardUser;
        await loginPage.login(username, password);
        await loginPage.waitForPageLoad();
    });

    test('TC035 - View product details page', async ({ inventoryPage, productDetailPage }) => {
        log('View product detail');
        await inventoryPage.clickProductByName(testData.products.backpack);

        const name = await productDetailPage.getProductName();
        expect(name).toBe(testData.products.backpack);

        const desc = await productDetailPage.getProductDescription();
        expect(desc.length).toBeGreaterThan(0);

        const price = await productDetailPage.getProductPrice();
        expect(price).toBeGreaterThan(0);
    });

    test('TC036 - Add to cart from product detail page', async ({ inventoryPage, productDetailPage }) => {
        log('Add to cart from detail page');
        await inventoryPage.clickProductByName(testData.products.bikeLight);
        await productDetailPage.addToCart();

        const removeVisible = await productDetailPage.isRemoveVisible();
        expect(removeVisible).toBeTruthy();
    });

    test('TC037 - Remove from cart on product detail page', async ({ inventoryPage, productDetailPage }) => {
        log('Remove from cart on detail page');
        await inventoryPage.clickProductByName(testData.products.bikeLight);
        await productDetailPage.addToCart();
        await productDetailPage.removeFromCart();

        const addVisible = await productDetailPage.isAddToCartVisible();
        expect(addVisible).toBeTruthy();
    });

    test('TC038 - Navigate back to products from detail page', async ({ inventoryPage, productDetailPage }) => {
        log('Back to products');
        await inventoryPage.clickProductByName(testData.products.onesie);
        await productDetailPage.goBackToProducts();

        const url = productDetailPage.page.url();
        expect(url).toContain('inventory');
    });
});

test.describe('End-to-End Purchase Flow', () => {

    test('TC039 - Complete purchase flow from login to order confirmation', async ({
        loginPage, inventoryPage, cartPage, checkoutPage
    }) => {
        log('E2E: Full purchase flow');

        // Step 1: Login
        await loginPage.open();
        const { username, password } = testData.users.standardUser;
        await loginPage.login(username, password);
        await loginPage.waitForPageLoad();

        // Step 2: Add products
        await inventoryPage.addProductToCartByName(testData.products.backpack);
        await inventoryPage.addProductToCartByName(testData.products.onesie);
        expect(await inventoryPage.getCartBadgeCount()).toBe(2);

        // Step 3: Go to cart
        await inventoryPage.goToCart();
        const cartItems = await cartPage.getAllCartItemNames();
        expect(cartItems).toHaveLength(2);

        // Step 4: Checkout
        await cartPage.proceedToCheckout();
        const { firstName, lastName, postalCode } = testData.checkout.validInfo;
        await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
        await checkoutPage.clickContinue();

        // Step 5: Verify overview
        const total = await checkoutPage.getTotal();
        expect(total).toBeGreaterThan(0);

        // Step 6: Finish
        await checkoutPage.clickFinish();
        const header = await checkoutPage.getCompleteHeader();
        expect(header).toBe('Thank you for your order!');

        // Step 7: Back to products
        await checkoutPage.clickBackHome();
        const title = await inventoryPage.getPageTitle();
        expect(title).toBe('Products');
    });
});
