var stringSimilarity = require("string-similarity");
//Package used to find degree of similarity for strings
//Taken from https://www.npmjs.com/package/string-similarity

const gitlabBlogCommands = {
    prepareWebsite: function () {
        this.navigate();
        this.click({
            selector: '@cookiesAcceptBtn',
            suppressNotFoundErrors: true
        })
        this.waitForElementVisible('@pageBanner', 5000);
    },
    validateRecentPostCount: function (count) {
        return this.api.elements('css selector', '@recentPostCards', cards =>{
            this.assert.strictEqual(cards.value.length,count)
        })
    },
    verifyBlogTitleUnique: function () {
        return this.api.elements('css selector', '@recentPostCardHeader', cards =>{
            const element = cards.value;
            let cardText = [];
            element.forEach(component => {
                this.api.elementIdText(Object.values(component)[0], result => {
                    cardText.push(result.value);
                })
            })
            this.perform(() =>{ //Perform used to set the command in callback because otherwise cardText doesnt have value, due to nightwatch scheduling
                //compareTwoStrings returns a 0-1 value of how similar two strings are based on Dice's Coefficient
                this.assert.ok(stringSimilarity.compareTwoStrings(cardText[0],cardText[1]) < 80);
                this.assert.ok((stringSimilarity.compareTwoStrings(cardText[0],cardText[2]) < 80));
                this.assert.ok((stringSimilarity.compareTwoStrings(cardText[1],cardText[2]) < 80));
            })
            
        })
    },
    validatePostDescLimit: function (limit) {
        return this.api.elements('css selector', '@recentPostCardDesc', cards =>{
            const element = cards.value;

            element.forEach(element => {
                this.api.elementIdText(Object.values(element)[0], result => {
                    this.assert.ok(result.value.length <= limit);
                })
            });
        })
    }
}

module.exports = {
    url: ' https://about.gitlab.com/blog/',
    commands: [gitlabBlogCommands],
    elements: {
        cookiesAcceptBtn: '#onetrust-accept-btn-handler',
        pageBanner: 'nav#global-nav',
        recentPostCards: 'div.blog-recent-post-grid div.flex-col.flex-col-1-3',
        recentPostCardHeader: 'div.blog-card-content a.blog-card-title',
        recentPostCardDesc: 'div.flex-col div.blog-card-excerpt'
    }
}