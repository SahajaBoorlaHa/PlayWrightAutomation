const {test,expect} = require ('@playwright/test');

test('Playwright Test for cookie injection', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/");
    console.log(await page.title());

});

test('Playwright Test for basic test', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        //await expect(page).toHaveTitle("Google");
        await page.locator("input#username").fill("rahulshetty");
        await page.locator("input#password").fill("learning");
        await page.locator("input#signInBtn").click();
        console.log(await page.locator("div[style*='display']").textContent());
        await expect(page.locator("div[style*='display']")).toContainText("Incorrect");    
    });
test('storing multiple elements',async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.locator("input#username").fill("rahulshettyacademy");
        await page.locator("input#password").fill("learning");
        await page.locator("input#signInBtn").click();
        /*
        const itemName = await page.locator("h4[class='card-title']").nth(1).textContent();
        const firstItem = await page.locator("h4[class='card-title']").first().textContent();
        console.log(itemName);
        console.log(firstItem);
        */
       //allTextContents() - This is not supported for automatic wait. So "waitForLoadState('networkidle')" will wait till all network calls gets completed. This is sometimes flacky so we can wait till last element gets loaded.
       await page.waitForLoadState('networkidle');
       await page.locator("h4[class='card-title']").last().waitFor();
       const allItems = await page.locator("h4[class='card-title']").allTextContents();
       console.log(allItems);


    });
    test('Register Page',async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator('a', {hasText: 'Register here'}).click();
        await page.locator("#firstName").fill("Sahaja");
        await page.locator("#lastName").fill("Marepally");
        await page.locator("input[formcontrolname='userEmail']").fill("sahaja.marepally@gmail.com");
        await page.locator("#userMobile").fill("8374727085");
        /*
        await page.locator("select[class*='custom-select']").click();
        //await page.locator("select[class*='custom-select'] option").first().waitFor();
        const options = await page.locator("select[class*='custom-select'] option").allTextContents();
        const optionSet = await page.locator("select[class*='custom-select'] option");
        console.log(options);
        //const length = await page.locator("select[class*='custom-select'] option").length();
        for(let i=1; i<5;i++)
        {
            //if(optionSet.nth(i).textContent()=="Scientist")
            if(options[i]=="Scientist")
            {
                optionSet.nth(i).selectOption();
            }
        }
        */
       await page.locator("#userPassword").fill("Sahaja@3996");
       await page.locator("#confirmPassword").fill("Sahaja@3996");
       await page.locator("input[type='checkbox']").check();
       await page.locator("#login").click();




    });

    test('UI elements',async ({page})=>
        {
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            await page.locator("input#username").fill("rahulshettyacademy");
            await page.locator("input#password").fill("learning");
            await page.locator("select.form-control").selectOption("Consultant");
            await page.locator("span.radiotextsty").last().click();
            await page.locator("button#okayBtn").click();
            console.log(await page.locator("span.radiotextsty").last().isChecked());
            expect(await page.locator("span.radiotextsty").last()).toBeChecked();
            await page.locator("input#terms").check();
            await expect(page.locator("input#terms")).toBeChecked();
            console.log(await page.locator("input#terms").isChecked());
            await expect(page.locator("a[href*='documents-request']")).toHaveAttribute('class','blinkingText');
            //expect(await page.locator("input#terms").isChecked()).toBeFalsy();
            //await page.pause();
            //await page.locator("input#signInBtn").click();
    
    
        });

        test('Child windows',async ({browser})=>
            {
                const context = await browser.newContext();
                const page = await context.newPage();
                await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
                await page.locator("input#username").fill("rahulshettyacademy");
                await page.locator("input#password").fill("learning");
                await page.locator("select.form-control").selectOption("Consultant");
                await page.locator("span.radiotextsty").last().click();
                await page.locator("button#okayBtn").click();
                console.log(await page.locator("span.radiotextsty").last().isChecked());
                expect(await page.locator("span.radiotextsty1").last()).toBeChecked();
                await page.locator("input#terms").check();
                //both needs to be run parallely. So await is not given. Current context will be new page
                const [newPage] = await Promise.all([
                    context.waitForEvent('page'),
                    page.locator("a[href*='documents-request']").click(),

                ])
                const name = await newPage.locator("strong a").textContent();
                const subString = name.split("@");
                console.log(subString[1]);
                //await page.pause();
        
        
            });
