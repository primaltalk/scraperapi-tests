'use strict';

const puppeteer = require('puppeteer');
const proxyChain = require('proxy-chain');

(async () => {
    const pattern = new RegExp(/(\d{5})/g);
    let loopCount = 0; // Let's not run infinitely.
    try {
        while (loopCount < 10) {
            loopCount ++;
            // To use an authenticating proxy server we have to chain through
            // proxy-chain, which will make authenticated requests for us.
            let proxyUrl = await proxyChain.anonymizeProxy('http://108.59.3.140:18015@165.227.118.92:8002');

            // The above gives us a URL we can use to launch puppeteer.
            let browser = await puppeteer.launch({
                args: [
                    `--proxy-server=${proxyUrl}`
                ]
            });
            let page = await browser.newPage();
            await page.goto('https://www.amazon.com/gp/product/B01DXI33T0');
            let element = await page.$('#glow-ingress-line2');
            let location = await page.evaluate(element => element.textContent, element);
            // If the location contains a zip code, we can assume we're in the US.
            if (pattern.test(location)) {
                let html = await page.content();
                console.log(html);
                break;
            }
            await browser.close();
        }
    } catch(err) {
        console.log(err);
    }
    process.exit();
}) ();
