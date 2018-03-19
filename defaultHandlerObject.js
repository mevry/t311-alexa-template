const https = require('https');



exports.defaultHandlerObject = {
    'LaunchRequest': function() {
        this.emit(':tell', 'Welcome to the GitHub Skill.');
    },
    'Unhandled': function() {
        this.emit(':ask', 'Please restate the question');
    }

};