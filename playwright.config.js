const { TIMEOUT, ACTION_TIMEOUT, NAVIGATION_TIMEOUT, SAUCE_DEMO_URL } = require('./config/env.config');

module.exports = {
    testDir: 'tests/specs',
    timeout: TIMEOUT,
    expect: {
        timeout: 10000,
    },
    retries: 0,
    workers: 1,
    reporter: [
        ['list'],
        ['html', { outputFolder: 'test-results/html-report', open: 'never' }],
    ],
    use: {
        headless: false,
        baseURL: SAUCE_DEMO_URL,
        actionTimeout: ACTION_TIMEOUT,
        navigationTimeout: NAVIGATION_TIMEOUT,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        viewport: { width: 1440, height: 900 },
        launchOptions: {
            slowMo: 500,
        },
    },
};