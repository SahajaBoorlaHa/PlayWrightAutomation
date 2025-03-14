const {test,expect} = require ('@playwright/test');
const { type } = require('node:os');

test('@Web Calendar Automation',async ({page})=>{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year];
    page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const monthView = await page.locator("input.react-date-picker__inputGroup__month");
    const navigation = await page.locator("span.react-calendar__navigation__label__labelText");

    await monthView.click();
    await navigation.click();
    await navigation.click();
    /*
    await page.getByRole("button",{name:"2027"}).click();
    await page.getByRole("button",{name:"April"}).click();
    await page.getByRole("button",{name:"17"}).click();
    */

    await page.locator("//button[text()='"+year+"']").click();
    await page.locator("button.react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
    await page.locator("//abbr[text()='"+15+"']").click();
    const inputs = await page.locator("div.react-date-picker__inputGroup input");
    for(let i=0;i<inputs.length;++i)
    {
        const value = inputs[i].getAttribute("value");
        await expect(value).toEqual(expectedList[index]);
    }


    await page.pause();

});