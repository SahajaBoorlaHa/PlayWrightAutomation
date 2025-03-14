const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const allure = require('allure-playwright');

const jsonPayloadLogin = {userEmail:"sahaja.marepally@gmail.com",userPassword:"Sahaja@3996"};
const jsonPayloadOrder = {orders:[{country:"India",productOrderedId:"676a6619e2b5443b1f004fff"}]};

let response;

test.beforeAll( async()=>
{
    let apiContext = await request.newContext();
    //apiContext and jsonPayLoad created here will be send to APIUtils class via contructor
    let apiUtils = new APIUtils(apiContext,jsonPayloadLogin);
    //createOrder(jsonPayloadOrder) method will return token and orderId in response object
    response = await apiUtils.createOrder(jsonPayloadOrder);

    //We are getting response(token and orderId) from APIUtils and sending apiContext which is created here to APIUtils


}
);



test('@Web place the order',async ({page})=>
    {  
        //setting token in local storage
        page.addInitScript(value => {
            window.localStorage.setItem('token', value);
        }, response.token);
        allure.startStep('Navigate to Login Page');
        await page.goto("https://rahulshettyacademy.com/client");
        allure.endStep('Navigated to Login Page');


        console.log(response.token);

        await page.locator("button[routerlink='/dashboard/myorders']").click();
        await page.locator("table.table tbody").waitFor();
        const orderHistoryRows = await page.locator("table.table tbody tr");
        //const orderCount = await orderHistoryRows.count();
        //console.log(orderCount);
        for(let i=0; i<await orderHistoryRows.count(); ++i)
            {
                let rowOrderId = await orderHistoryRows.nth(i).locator("th").textContent();
                console.log("rowOrderID is "+rowOrderId)
                if(response.orderId.includes(rowOrderId))
                {
                    console.log("entered if");
                    await orderHistoryRows.nth(i).locator("button").first().click();
                    break;
                }
            }   
            const orderIdDetails = await page.locator("div.col-text").textContent();
            await expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    


        //await page.pause();


    });


