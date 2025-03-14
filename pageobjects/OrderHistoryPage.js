class OrderHistoryPage
{
    constructor(page)
    {
        this.page = page;
        this.orderHistoryRows = page.locator("table.table tbody tr");

    }

}

module.exports = {OrderHistoryPage};