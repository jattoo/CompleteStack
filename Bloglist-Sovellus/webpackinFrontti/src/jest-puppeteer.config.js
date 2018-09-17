import puppeteer from 'puppeteer'

module.exports = {
    launch: {
        dumpio: true,
        headless: process.env.HEADLESS != 'false'
    }
}
