const { CheckoutPage } = require("./CheckoutPage");
const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { OrderHistoryPage } = require("./OrderHistoryPage");
const { PlaceOrderPage } = require("./PlaceOrderPage");

class PageObjectManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.checkOutPage = new CheckoutPage(page);
        this.placeOrderPage = new PlaceOrderPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }
    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardPage;
    }
    getCheckOutPage()
    {
        return this.checkOutPage;
    }
    getPlaceOrderPage()
    {
        return this.placeOrderPage;
    }
    getOrderHistoryPage()
    {
        return this.orderHistoryPage;
    }
}

module.exports = {PageObjectManager};