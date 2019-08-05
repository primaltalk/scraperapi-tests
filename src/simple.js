'use strict';

const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.reddit.com');
        let html = await page.content();
        await browser.close();
        console.log(html);
    } catch(err) {
        console.log(err);
    } finally {
        process.exit();
    }
}) ();
