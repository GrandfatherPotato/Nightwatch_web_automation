const gitlabStatusPage = require("../pageObjects/gitlabStatusPage");

module.exports = {
    'Login with invalid credentials': client => {
        let gitlabPage = client.page.gitlabStatusPage();

        //Load page
        gitlabPage.prepareWebsite();
        
        // Check all service statuses
        gitlabPage.verifyServiceStatuses('Operational');
        
    },
    'Validate blog page content': client => {
        let gitlabBlogPage = client.page.gitlabBlogPage();
        
        //Load page
        gitlabBlogPage.prepareWebsite('https://about.gitlab.com/blog/');

        //Validate Recent Post count
        gitlabBlogPage.validateRecentPostCount(3);

        //Verify that each blog title is unique
        gitlabBlogPage.verifyBlogTitleUnique();

        //Validate that each excerpt does not exceed limit
        gitlabBlogPage.validatePostDescLimit(145);
    }
}