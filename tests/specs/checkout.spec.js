const { test } = require('../fixtures/test.fixture');
const { expect } = require('@playwright/test');
const testData = require('../../test-data/testData.json');
const { log } = require('../helpers/utils');

test.describe('Checkout Tests', () => {

    test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
        await loginPage.open();
        const { username, password } = testData.users.standardUser;
        await loginPage.login(username, password);
        await loginPage.waitForPageLoad();
        await inventoryPage.addProductToCartByName(testData.products.backpack);
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
    });

    test('TC025 - Verify checkout step one page loads', async ({ checkoutPage }) => {
        log('Verify checkout step one');
        const title = await checkoutPage.getText(checkoutPage.stepOneTitle);
        expect(title).toContain('Checkout: Your Information');
    });

    test('TC026 - Fill valid checkout info and continue', async ({ checkoutPage }) => {
        log('Fill checkout info');
        const { firstName, lastName, postalCode } = testData.checkout.validInfo;
        await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
        await checkoutPage.clickContinue();

        const url = checkoutPage.page.url();
        expect(url).toContain('checkout-step-two');
    });

    test('TC027 - Submit checkout with empty first name shows error', async ({ checkoutPage }) => {
        log('Empty first name validation');
        await checkoutPage.fillCheckoutInfo('', 'Doe', '10001');
        await checkoutPage.clickContinue();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('First Name is required');
    });

    test('TC028 - Submit checkout with empty last name shows error', async ({ checkoutPage }) => {
        log('Empty last name validation');
        await checkoutPage.fillCheckoutInfo('John', '', '10001');
        await checkoutPage.clickContinue();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Last Name is required');
    });

    test('TC029 - Submit checkout with empty postal code shows error', async ({ checkoutPage }) => {
        log('Empty postal code validation');
        await checkoutPage.fillCheckoutInfo('John', 'Doe', '');
        await checkoutPage.clickContinue();

        const error = await checkoutPage.getErrorMessage();
        expect(error).toContain('Postal Code is required');
    });

    test('TC030 - Cancel checkout returns to cart', async ({ checkoutPage }) => {
        log('Cancel checkout');
        await checkoutPage.clickCancel();

        const url = checkoutPage.page.url();
        expect(url).toContain('cart');
    });
});

test.describe('Checkout Overview & Complete Tests', () => {

    test.beforeEach(async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        await loginPage.open();
        const { username, password } = testData.users.standardUser;
        await loginPage.login(username, password);
        await loginPage.waitForPageLoad();
        await inventoryPage.addProductToCartByName(testData.products.backpack);
        await inventoryPage.addProductToCartByName(testData.products.bikeLight);
        await inventoryPage.goToCart();
        await cartPage.proceedToCheckout();
        const { firstName, lastName, postalCode } = testData.checkout.validInfo;
        await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
        await checkoutPage.clickContinue();
    });

    test('TC031 - Verify checkout overview shows correct items', async ({ checkoutPage }) => {
        log('Verify overview items');
        const itemCount = await checkoutPage.getOverviewItemCount();
        expect(itemCount).toBe(2);
    });

    test('TC032 - Verify subtotal, tax, and total are calculated', async ({ checkoutPage }) => {
        log('Verify price calculations');
        const subtotal = await checkoutPage.getSubtotal();
        const tax = await checkoutPage.getTax();
        const total = await checkoutPage.getTotal();

        expect(subtotal).toBeGreaterThan(0);
        expect(tax).toBeGreaterThan(0);
        expect(total).toBeCloseTo(subtotal + tax, 2);
    });

    test('TC033 - Complete the order successfully', async ({ checkoutPage }) => {
        log('Complete order');
        await checkoutPage.clickFinish();

        const isComplete = await checkoutPage.isOrderComplete();
        expect(isComplete).toBeTruthy();

        const header = await checkoutPage.getCompleteHeader();
        expect(header).toBe('Thank you for your order!');
    });

    test('TC034 - Back Home after order returns to products', async ({ checkoutPage, inventoryPage }) => {
        log('Back Home after order');
        await checkoutPage.clickFinish();
        await checkoutPage.clickBackHome();

        const url = checkoutPage.page.url();
        expect(url).toContain('inventory');

        const title = await inventoryPage.getPageTitle();
        expect(title).toBe('Products');
    });
});
