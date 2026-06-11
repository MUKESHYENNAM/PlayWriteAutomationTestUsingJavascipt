const { test } = require('../fixtures/test.fixture');
const { expect } = require('@playwright/test');
const testData = require('../../test-data/testData.json');
const { log } = require('../helpers/utils');

test.describe('Login Page Tests', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
    });

    test('TC001 - Verify login page loads successfully', async ({ loginPage }) => {
        log('Verifying login page loads');
        const logoVisible = await loginPage.isLogoVisible();
        expect(logoVisible).toBeTruthy();

        const formVisible = await loginPage.isLoginFormVisible();
        expect(formVisible).toBeTruthy();
    });

    test('TC002 - Login with valid standard_user credentials', async ({ loginPage, inventoryPage }) => {
        log('Login with standard_user');
        const { username, password } = testData.users.standardUser;
        await loginPage.login(username, password);
        await loginPage.waitForPageLoad();

        const url = await loginPage.getURL();
        expect(url).toContain('inventory');

        const pageTitle = await inventoryPage.getPageTitle();
        expect(pageTitle).toBe('Products');
    });

    test('TC003 - Login with locked_out_user shows error', async ({ loginPage }) => {
        log('Login with locked_out_user');
        const { username, password } = testData.users.lockedOutUser;
        await loginPage.login(username, password);

        const errorDisplayed = await loginPage.isErrorDisplayed();
        expect(errorDisplayed).toBeTruthy();

        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Sorry, this user has been locked out');
    });

    test('TC004 - Login with invalid credentials shows error', async ({ loginPage }) => {
        log('Login with invalid credentials');
        const { username, password } = testData.users.invalidUser;
        await loginPage.login(username, password);

        const errorDisplayed = await loginPage.isErrorDisplayed();
        expect(errorDisplayed).toBeTruthy();

        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Username and password do not match');
    });

    test('TC005 - Login with empty username shows error', async ({ loginPage }) => {
        log('Login with empty username');
        await loginPage.login('', 'secret_sauce');

        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Username is required');
    });

    test('TC006 - Login with empty password shows error', async ({ loginPage }) => {
        log('Login with empty password');
        await loginPage.login('standard_user', '');

        const errorMsg = await loginPage.getErrorMessage();
        expect(errorMsg).toContain('Password is required');
    });

    test('TC007 - Close error message by clicking X button', async ({ loginPage }) => {
        log('Close error message');
        await loginPage.login('', '');
        const errorDisplayed = await loginPage.isErrorDisplayed();
        expect(errorDisplayed).toBeTruthy();

        await loginPage.closeError();
        const errorGone = await loginPage.isVisible(loginPage.errorMessage, 1000);
        expect(errorGone).toBeFalsy();
    });
});
