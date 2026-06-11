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



