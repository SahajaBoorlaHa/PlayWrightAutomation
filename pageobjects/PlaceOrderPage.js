class PlaceOrderPage
{
    constructor(page)
    {
        this.page = page;
        this.selectCountryDropdown = page.locator("input[placeholder='Select Country']");
        this.dropdown = page.locator(".ta-results");
        this.placeOrderButton = page.locator("a.action__submit");


    }

    async selectCountry(searchKey,country)
    {
        await this.selectCountryDropdown.pressSequentially(searchKey);
        await this.dropdown.waitFor();
        const count2 = await this.dropdown.locator("button").count();
        for(let i=0; i<count2; ++i)
            {
                console.log("for");
                const text = await this.dropdown.locator("button").nth(i).textContent();
                if(text === country) 
                    {
                        await this.dropdown.locator("button").nth(i).click();
                        break;
                    }           
            }
    }
    async placeOrder()
    {
        await this.placeOrderButton.click();

    }
}

module.exports = {PlaceOrderPage};