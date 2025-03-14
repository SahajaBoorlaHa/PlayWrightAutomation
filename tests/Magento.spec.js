const {test,expect} = require ('@playwright/test');
const { type } = require('node:os');

test('Magento',async ({page})=>{
    await page.goto("https://magento.softwaretestingboard.com");
    await page.locator("//div[@class='panel header']//ul//li[3]//a").click();
    await page.locator("input#firstname").fill("Sahaja");
    await page.locator("input#lastname").fill("Boorla");
});