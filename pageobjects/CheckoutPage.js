//This is cart page where user can check-out
class CheckoutPage
{
    constructor(page)
    {
        this.page = page;
        this.checkoutButton = page.locator("div.ng-star-inserted button");

    }
    async checkoutPage()
    {
        await this.checkoutButton.click();
    }
}

module.exports = {CheckoutPage};