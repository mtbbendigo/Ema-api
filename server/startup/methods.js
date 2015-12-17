
Meteor.methods({
    getEnvironments: function() {
       Environments.loadFromDataSource();
    },

    getHubLogs: function(parameters) {
        HubLogs.loadFromDataSource();
    }
});