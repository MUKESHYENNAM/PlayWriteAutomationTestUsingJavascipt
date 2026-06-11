// Utility functions for Sauce Demo automation framework

function log(message) {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Get a future date string in DD/MM/YYYY format
 * @param {number} daysFromNow - Number of days from today
 * @returns {string} - Date in DD/MM/YYYY format
 */
function getFutureDate(daysFromNow = 1) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

/**
 * Get today's date in DD/MM/YYYY format
 * @returns {string} - Today's date
 */
function getTodayDate() {
    return getFutureDate(0);
}

module.exports = {
    log,
    generateRandomString,
    delay,
    getFutureDate,
    getTodayDate,
};