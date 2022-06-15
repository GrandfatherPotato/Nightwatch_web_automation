const gitlabStatusCommands = {
    prepareWebsite: function () {
        this.navigate();
        this.waitForElementVisible('@pageLogo', 5000);
    },
    verifyServiceStatuses: function (status) {
        return this.api.elements('css selector', '@componentStatusText', result => {
            const elements = result.value;
            let count = 0;
            let componentStatuses = [];
            
            elements.forEach(element => {
              componentStatuses.push(Object.values(element)[0]);
            })
            componentStatuses.forEach(component => {
                this.api.elementIdText(component, result => {
                    count++;
                    const text = result.value;
                    
                    try { //If failed verify throws error
                        if (!this.verify.strictEqual(status,text)) {
                            throw Error
                        }
                    } catch (e){
                        console.log(`Error at ${count}!`);
                        this.api.moveTo(component,10,10); //Moves to failed element
                        this.api.windowMaximize();   //Maximizes window
                        this.api.saveScreenshot(`test_screenshots/service${count}_failed.png`); //Saves screenshot of area
                    }
                })
            })
        })
    }
}

module.exports = {
    url: 'https://status.gitlab.com/',
    commands: [gitlabStatusCommands],
    elements: {
        pageLogo: 'img#statuspage_logo',
        componentStatusText: '.component-status'
    }
}