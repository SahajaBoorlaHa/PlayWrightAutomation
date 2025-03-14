class LoginPage
{
    constructor(page)
    {
        this.page = page;
        this.signInButton = page.locator("input#login");
        this.userEmail = page.locator("#userEmail");
        this.userPwd = page.locator("input#userPassword");
        
    }

    async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(useremail,userpassword)
    {
        //await page.goto("https://rahulshettyacademy.com/client");
        //await page. waitForSelector("userEinputmail");
        await this.userEmail.fill(useremail);
        await this.userPwd.fill(userpassword);
        await this.signInButton.click();
    }
}

module.exports = {LoginPage};