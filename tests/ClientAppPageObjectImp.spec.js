const {test,expect} = require('@playwright/test');
const {PageObjectManager} = require("../pageobjects/PageObjectManager");
const { default: AllureReporter } = require('allure-playwright');
const dataset =  JSON.parse(JSON.stringify(require("../utils/clientappTestData.json")));


for(const data of dataset)
{
    test(`Place Order For ${data.productName}`,async ({page})=>
    {
        const pageObjMngr = new PageObjectManager(page);

        
        const loginPage = pageObjMngr.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.useremail,data.userpassword);
        //wait till complete page gets loaded as automatic wait is not supported for list. next 2 lines
        //await page.waitForLoadState('networkidle');
        
        const dashboardPage = pageObjMngr.getDashboardPage();
        await dashboardPage.searchProductAndAddToCart(data.productName);
        await dashboardPage.navigateToCart();
        
        expect(await page.locator("div.cartSection h3").textContent()).toEqual(data.productName);
        //expect(bool).toBeTruthy();
        const checkOutPage = pageObjMngr.getCheckOutPage();
        await checkOutPage.checkoutPage();

        const placeOrderPage = pageObjMngr.getPlaceOrderPage();
        await placeOrderPage.selectCountry(data.searchKey,data.country);
        
        await expect(page.locator("div.mt-5 label")).toHaveText(data.useremail);
        await placeOrderPage.placeOrder();

        await expect(page.locator("h1.hero-primary")).toHaveText("Thankyou for the order.");
        const orderIdFull = await page.locator("label.ng-star-inserted").textContent();
        const orderIdSplitted = orderIdFull.split(" ");
        const orderId = orderIdSplitted[2];
        console.log(orderId);

        await dashboardPage.navigateToOrders();
        
        const orderHistoryPage = pageObjMngr.getOrderHistoryPage(page);
        const orderCount = await orderHistoryPage.orderHistoryRows.count();
        console.log(orderCount);
        for(let i=0;i<orderCount;++i)
        {
            const orderIdFromTable = await orderHistoryPage.orderHistoryRows.nth(i).locator("th").textContent();
            await expect(orderIdFromTable).toBe(orderId);
        }


    });

}