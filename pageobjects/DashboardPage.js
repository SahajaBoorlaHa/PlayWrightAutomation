class DashboardPage
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator("div.card-body");
        this.cart = page.locator("button[routerlink='/dashboard/cart']");
        this.navigateCart = page.locator("button[routerlink='/dashboard/cart']")
        this.myOrdersPage = page.locator("button[routerlink='/dashboard/myorders']");

    }

    async searchProductAndAddToCart(productName)
    {
        await this.products.last().waitFor();       
        const count = await this.products.count();
        for(let i=0;i<count;++i)
        {
            console.log("entered for");
            if(await this.products.nth(i).locator("b").textContent()==productName)
            {
                console.log("entered if");
                await this.products.nth(i).locator("button.w-10").click();
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.navigateCart.click();
        await this.page.locator("div.infoWrap").last().waitFor();
        //check capability of is visibility method. This is not supported as per playwright official document.
        //const bool = await page.locator("div.cartSection h3:has-text(selectProduct)").isVisible();
    }
    async navigateToOrders()
    {
        await this.myOrdersPage.click();
        await this.page.locator("table.table tbody").waitFor();
    }


}
module.exports = {DashboardPage};