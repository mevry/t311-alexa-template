//Default Handler
exports.defaultHandlerObject = {
    'LaunchRequest': function() {
        this.emit(':tell', 'Welcome to the T-3-1-1 Skill');
    },
    'Unhandled': function() {
        this.emit(':ask', 'Please restate the question');
    }

};