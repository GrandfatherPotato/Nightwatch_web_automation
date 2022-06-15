module.exports = {
    'Login with invalid credentials': client => {
        let sportsDirectPage = client.page.sportsDirectPage();

        //Load page
        sportsDirectPage.prepareWebsite();
        
        //Login
        sportsDirectPage.login(false,'hehe71','hehe72');

        //Validate error message
        sportsDirectPage.validateEmailError();
    },
    'Login': client => {
        let sportsDirectPage = client.page.sportsDirectPage();
        let accountEmail = 'angrychicken2001@gmail.com';
        let accountPassword = 'NightWatch2022';

        //Load page
        sportsDirectPage.prepareWebsite();
        
        //Login
        sportsDirectPage.login(true,accountEmail,accountPassword);

        //Go to account info
        sportsDirectPage.checkAccountInfo();

        //Validate correct info is shown
        sportsDirectPage.validateAccountInfo(accountEmail);
    }
}