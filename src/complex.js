'use strict';

const puppeteer = require('puppeteer-extra');
const proxyChain = require('proxy-chain');
const pluginStealth = require('puppeteer-extra-plugin-stealth');

// We'll be using the puppeteer-extra-plugin-stealth plugin to avoid puppeteer detection
// by the site we're scraping.  This is does not work for urban outfitters, but is a good
// example of what we can use to avoid bot detection as a standard, extensible solution.
puppeteer.use(pluginStealth());

(async () => {
    try {
        // To use an authenticating proxy server we have to chain through
        // proxy-chain, which will make authenticated requests for us.
        const proxyUrl = await proxyChain.anonymizeProxy('http://108.59.3.140:18015@165.227.118.92:8002');

        // The above gives us a URL we can use to launch puppeteer.
        const browser = await puppeteer.launch({
            args: [
                `--proxy-server=${proxyUrl}`
            ]
        });

        const page = await browser.newPage();
        const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
        await page.setUserAgent(userAgent);

        // Bot detection for the page seems to be based on javascript, so let's not load any.
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.resourceType() === 'script') {
                request.abort();
            } else {
                request.continue();
            }
        });

        await page.goto('https://www.urbanoutfitters.com/shop/uo-corduroy-hooded-cropped-jacket?category=jackets-coats-for-women&color=081&type=REGULAR', {
            waitUntil: 'networkidle2',
            timeout: 3000000
        });
        const html = await page.content();
        console.log(html);
        await browser.close();
    } catch(err) {
        console.log(err);
    }
    process.exit();
}) ();
