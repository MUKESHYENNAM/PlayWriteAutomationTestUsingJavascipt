# Playwright Automation Project

This project is a Playwright automation framework designed for testing web applications. It provides a structured approach to writing and organizing tests, utilizing the Playwright API for browser automation.

## Project Structure

```
playwright-automation
├── tests
│   ├── specs
│   │   └── sample.spec.js
│   ├── pages
│   │   └── BasePage.js
│   ├── fixtures
│   │   └── test.fixture.js
│   └── helpers
│       └── utils.js
├── config
│   └── env.config.js
├── test-data
│   └── testData.json
├── playwright.config.js
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd playwright-automation
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Running Tests

To run the tests, use the following command:
```
npx playwright test
```

### Project Files

- **tests/specs/sample.spec.js**: Contains the test specifications for the Playwright automation.
- **tests/pages/BasePage.js**: Exports the BasePage class for common page object methods.
- **tests/fixtures/test.fixture.js**: Exports a fixture setup for shared data and state across tests.
- **tests/helpers/utils.js**: Exports utility functions for various tasks in the automation framework.
- **config/env.config.js**: Contains environment configuration settings.
- **test-data/testData.json**: Contains test data in JSON format for use in test cases.
- **playwright.config.js**: Configuration file for Playwright settings.
- **package.json**: Configuration file for npm dependencies and scripts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.







npm test
   │
   ▼
┌─────────────────────────────────────────────────┐
│  1. package.json                                │
│     "test": "playwright test"                   │
│     → Runs the Playwright CLI                   │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  2. playwright.config.js                        │
│     → Loads config from config/env.config.js    │
│     → Sets testDir: 'tests/specs'              │
│     → Sets browser options (headless, timeout)  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  3. config/env.config.js                        │
│     → Provides: SAUCE_DEMO_URL, TIMEOUT, etc.  │
│     → These values feed into playwright.config  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  4. tests/specs/*.spec.js  (Test Files)         │
│     → login.spec.js, inventory.spec.js, etc.    │
│     → Each imports { test } from fixture        │
│     → Each imports testData.json                │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  5. tests/fixtures/test.fixture.js              │
│     → Extends Playwright's base `test`          │
│     → Creates Page Objects (loginPage,          │
│       inventoryPage, cartPage, etc.)            │
│     → Injects them into each test as params     │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  6. tests/pages/ (Page Object Model)            │
│     → BasePage.js  (common methods)             │
│     → LoginPage.js extends BasePage             │
│     → InventoryPage.js extends BasePage         │
│     → CartPage.js extends BasePage              │
│     → CheckoutPage.js extends BasePage          │
│     → ProductDetailPage.js extends BasePage     │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  7. test-data/testData.json                     │
│     → Usernames, passwords, product names       │
│     → Checkout info, sort options               │
│     → Used by spec files for test data          │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│  8. tests/helpers/utils.js                      │
│     → log(), delay(), generateRandomString()    │
│     → Utility functions used in spec files      │
└─────────────────────────────────────────────────┘



Step-by-step breakdown
Step 1 → package.json (Entry Point)
"test": "playwright test"
When you run npm test, it calls the Playwright CLI which looks for playwright.config.js in the root.

Step 2 → playwright.config.js (Configuration)

requires → config/env.config.js (gets URL, timeouts)
sets     → testDir: 'tests/specs'  ← WHERE to find tests
sets     → headless: false         ← show browser
sets     → timeout: 30000         ← 30s max per test
sets     → screenshot, video      ← on failure

Step 3 → env.config.js (Environment Variables)
SAUCE_DEMO_URL = 'https://www.saucedemo.com/'
TIMEOUT = 30000

Single place to change URL/timeouts for all tests.

Step 4 → login.spec.js (Test File)

const { test } = require('../fixtures/test.fixture');  // ← gets custom test
const testData = require('../../test-data/testData.json'); // ← gets test data

test('TC002 - Login', async ({ loginPage, inventoryPage }) => {
    // loginPage & inventoryPage come from fixture ↑
    await loginPage.open();
    await loginPage.login(testData.users.standardUser.username, ...);
});

Step 5 → test.fixture.js (Dependency Injection)

const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));  // Creates LoginPage, injects into test
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    // ... same for cartPage, checkoutPage, productDetailPage
});

This is the bridge between test files and Page Objects.

Step 6 → LoginPage.js (Page Object)
LoginPage extends BasePage
    ├── constructor: defines locators (usernameInput, passwordInput, etc.)
    ├── open(): navigates to SAUCE_DEMO_URL
    ├── login(): fills username + password + clicks login
    └── inherits: click(), fill(), getText() from BasePage

Step 7 → testData.json (Test Data)

    Keeps ALL test data separate from test logic:
  - usernames/passwords
  - product names
  - checkout info

   Visual Example: What happens when TC002 runs

   npm test
  → playwright.config.js loads (gets settings)
  → finds login.spec.js in tests/specs/
  → test.fixture.js creates LoginPage(page) + InventoryPage(page)
  → TC002 starts:
      1. loginPage.open()
         → BasePage.navigateTo('https://www.saucedemo.com/')
      2. loginPage.login('standard_user', 'secret_sauce')
         → BasePage.fill(usernameInput, 'standard_user')
         → BasePage.fill(passwordInput, 'secret_sauce')
         → BasePage.click(loginButton)
      3. expect(url).toContain('inventory') ✅
      4. inventoryPage.getPageTitle() → 'Products' ✅




Let me gather all the key files to explain the complete flow.

Read package.json

Read playwright.config.js

Read env.config.js

Read test.fixture.js

Read BasePage.js

Read LoginPage.js

Read testData.json

Here's the complete execution flow of your project, step by step:

🔄 Complete Execution Flow
📋 Step-by-step breakdown
Step 1 → package.json (Entry Point)
When you run npm test, it calls the Playwright CLI which looks for playwright.config.js in the root.

Step 2 → playwright.config.js (Configuration)
Step 3 → env.config.js (Environment Variables)
Single place to change URL/timeouts for all tests.

Step 4 → login.spec.js (Test File)
Step 5 → test.fixture.js (Dependency Injection)
This is the bridge between test files and Page Objects.

Step 6 → LoginPage.js (Page Object)
Step 7 → testData.json (Test Data)
🎯 Visual Example: What happens when TC002 runs
📁 Project Structure Summary
File/Folder	Role
package.json	Entry point — defines npm test command
playwright.config.js	Settings — browser, timeouts, test folder
env.config.js	Environment — URLs, timeout values
test.fixture.js	DI Container — creates & injects page objects
BasePage.js	Parent class — shared methods (click, fill, etc.)
LoginPage.js	Page Object — login page locators & actions
InventoryPage.js	Page Object — products page locators & actions
CartPage.js	Page Object — cart page locators & actions
CheckoutPage.js	Page Object — checkout locators & actions
tests/specs/*.spec.js	Test files — actual test cases
testData.json	Test data — usernames, products, etc.
utils.js	Utilities — log(), delay(), helpers
