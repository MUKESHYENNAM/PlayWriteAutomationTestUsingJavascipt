# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: inventory.spec.js >> Inventory Page Tests >> TC017 - Logout from the application
- Location: tests/specs/inventory.spec.js:94:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "https://www.saucedemo.com/"
Received: Promise {}
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]
      - textbox "Password" [ref=e13]
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1   | const { test } = require('../fixtures/test.fixture');
  2   | const { expect } = require('@playwright/test');
  3   | const testData = require('../../test-data/testData.json');
  4   | const { log } = require('../helpers/utils');
  5   | 
  6   | test.describe('Inventory Page Tests', () => {
  7   | 
  8   |     test.beforeEach(async ({ loginPage }) => {
  9   |         await loginPage.open();
  10  |         const { username, password } = testData.users.standardUser;
  11  |         await loginPage.login(username, password);
  12  |         await loginPage.waitForPageLoad();
  13  |     });
  14  | 
  15  |     test('TC008 - Verify Products page displays 6 products', async ({ inventoryPage }) => {
  16  |         log('Verifying product count');
  17  |         const count = await inventoryPage.getProductCount();
  18  |         expect(count).toBe(6);
  19  |     });
  20  | 
  21  |     test('TC009 - Verify all product names are displayed', async ({ inventoryPage }) => {
  22  |         log('Verifying product names');
  23  |         const names = await inventoryPage.getAllProductNames();
  24  |         expect(names).toContain(testData.products.backpack);
  25  |         expect(names).toContain(testData.products.bikeLight);
  26  |         expect(names).toContain(testData.products.boltTShirt);
  27  |         expect(names).toContain(testData.products.fleeceJacket);
  28  |         expect(names).toContain(testData.products.onesie);
  29  |         expect(names).toContain(testData.products.redTShirt);
  30  |     });
  31  | 
  32  |     test('TC010 - Add single product to cart', async ({ inventoryPage }) => {
  33  |         log('Adding Backpack to cart');
  34  |         await inventoryPage.addProductToCartByName(testData.products.backpack);
  35  | 
  36  |         const badgeCount = await inventoryPage.getCartBadgeCount();
  37  |         expect(badgeCount).toBe(1);
  38  | 
  39  |         const isAdded = await inventoryPage.isProductAddedToCart(testData.products.backpack);
  40  |         expect(isAdded).toBeTruthy();
  41  |     });
  42  | 
  43  |     test('TC011 - Add multiple products to cart', async ({ inventoryPage }) => {
  44  |         log('Adding multiple products to cart');
  45  |         await inventoryPage.addProductToCartByName(testData.products.backpack);
  46  |         await inventoryPage.addProductToCartByName(testData.products.bikeLight);
  47  |         await inventoryPage.addProductToCartByName(testData.products.onesie);
  48  | 
  49  |         const badgeCount = await inventoryPage.getCartBadgeCount();
  50  |         expect(badgeCount).toBe(3);
  51  |     });
  52  | 
  53  |     test('TC012 - Remove product from cart on inventory page', async ({ inventoryPage }) => {
  54  |         log('Remove product from cart');
  55  |         await inventoryPage.addProductToCartByName(testData.products.backpack);
  56  |         expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  57  | 
  58  |         await inventoryPage.removeProductFromCartByName(testData.products.backpack);
  59  |         expect(await inventoryPage.getCartBadgeCount()).toBe(0);
  60  |     });
  61  | 
  62  |     test('TC013 - Sort products by Name (A to Z)', async ({ inventoryPage }) => {
  63  |         log('Sort A-Z');
  64  |         await inventoryPage.sortProducts(testData.sortOptions.nameAZ);
  65  |         const names = await inventoryPage.getAllProductNames();
  66  |         const sorted = [...names].sort();
  67  |         expect(names).toEqual(sorted);
  68  |     });
  69  | 
  70  |     test('TC014 - Sort products by Name (Z to A)', async ({ inventoryPage }) => {
  71  |         log('Sort Z-A');
  72  |         await inventoryPage.sortProducts(testData.sortOptions.nameZA);
  73  |         const names = await inventoryPage.getAllProductNames();
  74  |         const sorted = [...names].sort().reverse();
  75  |         expect(names).toEqual(sorted);
  76  |     });
  77  | 
  78  |     test('TC015 - Sort products by Price (low to high)', async ({ inventoryPage }) => {
  79  |         log('Sort Price low-high');
  80  |         await inventoryPage.sortProducts(testData.sortOptions.priceLowHigh);
  81  |         const prices = await inventoryPage.getAllProductPrices();
  82  |         const sorted = [...prices].sort((a, b) => a - b);
  83  |         expect(prices).toEqual(sorted);
  84  |     });
  85  | 
  86  |     test('TC016 - Sort products by Price (high to low)', async ({ inventoryPage }) => {
  87  |         log('Sort Price high-low');
  88  |         await inventoryPage.sortProducts(testData.sortOptions.priceHighLow);
  89  |         const prices = await inventoryPage.getAllProductPrices();
  90  |         const sorted = [...prices].sort((a, b) => b - a);
  91  |         expect(prices).toEqual(sorted);
  92  |     });
  93  | 
  94  |     test('TC017 - Logout from the application', async ({ inventoryPage, loginPage }) => {
  95  |         log('Testing logout');
  96  |         await inventoryPage.logout();
  97  |         await loginPage.waitForPageLoad();
  98  | 
  99  |         const url = loginPage.getURL();
> 100 |         expect(url).toBe('https://www.saucedemo.com/');
      |                     ^ Error: expect(received).toBe(expected) // Object.is equality
  101 | 
  102 |         const loginFormVisible = await loginPage.isLoginFormVisible();
  103 |         expect(loginFormVisible).toBeTruthy();
  104 |     });
  105 | 
  106 |     test('TC018 - Click on product to view details', async ({ inventoryPage, productDetailPage }) => {
  107 |         log('Viewing product details');
  108 |         await inventoryPage.clickProductByName(testData.products.backpack);
  109 | 
  110 |         const name = await productDetailPage.getProductName();
  111 |         expect(name).toBe(testData.products.backpack);
  112 | 
  113 |         const price = await productDetailPage.getProductPrice();
  114 |         expect(price).toBeGreaterThan(0);
  115 |     });
  116 | });
  117 | 
```