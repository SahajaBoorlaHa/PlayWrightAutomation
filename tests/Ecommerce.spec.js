const {test,expect} = require ('@playwright/test');

    test.only('Ecommerce Page',async ({page})=>
    {
        const selectProduct = "IPHONE 13 PRO";
        const email = "sahaja.marepally@gmail.com";
        //const cartList =await page.locator("div.infoWrap");
        const products = await page.locator("div.card-body");
        await page.goto("https://rahulshettyacademy.com/client");
        //await page. waitForSelector("userEinputmail");
        await page.locator("#userEmail").fill(email);
        await page.locator("input#userPassword").fill("Sahaja@3996");
        await page.locator("input#login").click();
        //wait till complete page gets loaded as automatic wait is not supported for list. next 2 lines
        //await page.waitForLoadState('networkidle');
        await products.last().waitFor();
        const count = await products.count();
        for(let i=0;i<count;++i)
        {
            console.log("entered for");
            if(await products.nth(i).locator("b").textContent()==selectProduct)
            {
                console.log("entered if");
                await products.nth(i).locator("button.w-10").click();
                break;
            }
        }
        await page.locator("button[routerlink='/dashboard/cart']").click();
        await page.locator("div.infoWrap").last().waitFor();
        //check capability of is visibility method. This is not supported as per playwright official document.
        //const bool = await page.locator("div.cartSection h3:has-text(selectProduct)").isVisible();
        expect(await page.locator("div.cartSection h3").textContent()).toEqual(selectProduct);
        //expect(bool).toBeTruthy();
        await page.locator("div.ng-star-inserted button").click();

        await page.locator("input[placeholder='Select Country']").pressSequentially("ind");
        const dropdown = page.locator(".ta-results");
        await dropdown.waitFor();
        //await dropdown.waitFor();
        const count2 = await dropdown.locator("button").count();
        console.log(count2);
        for(let i=0; i<count2; ++i){
            console.log("for");
            const text = await dropdown.locator("button").nth(i).textContent();
            if(text === " India") {
                //console.log("if");
                await dropdown.locator("button").nth(i).click();
                break;
            }           

        }
        await expect(page.locator("div.mt-5 label")).toHaveText(email);
        await page.locator("a.action__submit").click();
        await expect(page.locator("h1.hero-primary")).toHaveText("Thankyou for the order.");
        const orderIdFull = await page.locator("label.ng-star-inserted").textContent();
        const orderIdSplitted = orderIdFull.split(" ");
        const orderId = orderIdSplitted[2];
        console.log(orderId);

        await page.locator("button[routerlink='/dashboard/myorders']").click();
        await page.locator("table.table tbody").waitFor();
        const orderHistoryRows = await page.locator("table.table tbody tr");
        const orderCount = await orderHistoryRows.count();
        console.log(orderCount);
        for(let i=0;i<orderCount;++i)
        {
            const orderIdFromTable = await orderHistoryRows.nth(i).locator("th").textContent();
            await expect(orderIdFromTable).toBe(orderId);
        }

        


        await page.pause();




    });

