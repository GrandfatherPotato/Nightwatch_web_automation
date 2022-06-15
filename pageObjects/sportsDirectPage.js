const sportsDirectCommands = {
    prepareWebsite: function () {
        this.navigate();
        this.waitForElementVisible('@controlWrap', 5000);
    },
    login: function (clickLogin,email,password) {
        this.click('@loginBtn');
        this.setValue('@emailField', email);
        this.setValue('@passwordField', password);
        console.log(clickLogin);
        if (clickLogin) { //If clicked with invalid input, will clear input
            this.click('@loginFormBtn');
        }
    },
    validateEmailError: function () {
        this.assert.visible('@emailError');
        this.assert.textContains('@emailError','The Email Address field is not a valid e-mail address.');
    },
    checkAccountInfo: function () {
        this.waitForElementVisible('@controlWrap', 5000);
        this.click('@bannerAccountBtn');
        this.click('@myDetailsBox');
    },
    validateAccountInfo: function(email) {
        this.assert.visible('@accountEmailField');
        this.assert.valueEquals('@accountEmailField',email);
    }
}

module.exports = {
    url: 'https://lv.sportsdirect.com/',
    commands: [sportsDirectCommands],
    elements: {
        controlWrap: '.ControlWrap',
        loginBtn: '#divSignIn',
        emailField: '#Login_EmailAddress',
        passwordField: '#Login_Password',
        loginFormBtn: '#LoginButton',
        bannerAccountBtn: 'ul.TopLinkMenu li.lillAccounts',
        emailError: '#Login_EmailAddress-error',
        myDetailsBox: 'div.accountBox div.personalInfo',
        accountEmailField: '#txtEmailAddress'
    }
}