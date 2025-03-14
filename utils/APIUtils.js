class APIUtils
{
    constructor(apiContext,jsonPayloadLogin)
    {
        this.apiContext = apiContext;
        this.jsonPayloadLogin = jsonPayloadLogin;
    }
    async getToken()
    {
            const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data:this.jsonPayloadLogin
            });
        
            //expect(loginResponse.ok()).toBeTruthy();
            const responseJson = await loginResponse.json();
            const token = responseJson.token;
            console.log(token);
            return token;
            //Now we need to set this in local storage
    }

    async createOrder(jsonPayloadOrder)
    {
        //We are storing token and orderId here and sending it to test cases which are in LoginPageAndOrder.spec.js
        let response = {};
        response.token = await this.getToken();
        //Create order through API
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data:jsonPayloadOrder,
                headers:{
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                        
                },
                    
            });
        
        //expect(orderResponse.ok()).toBeTruthy();
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId
        console.log("order id is "+orderId);
        return response;
    }
}

module.exports = {APIUtils};