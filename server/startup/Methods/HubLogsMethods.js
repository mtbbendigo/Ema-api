/**
 * Created by holly on 10/01/2016.
 */
//Future = Npm.require('fibers/future');
var defaultURI = "http://localhost:10010/ema/";
var defaultEnv = {env: 'huba1'};

Meteor.methods({
    getHubLogs: function(params) {
        //check(params, Map);
        if(params === null || params === undefined){
            params = defaultEnv;
        }

        this.unblock();
        var options = {params};
        return Meteor.http.get(defaultURI + "hublog?", options);
    },

    getApplications: function(params) {
        if(params === null || params === undefined){
            params = defaultEnv;
        }
        console.log(JSON.stringify(params));
        this.unblock();
        return Meteor.http.get(defaultURI + "apps", params);
    },

    getEnvironments: function(params) {
        Environments.remove({});
        this.unblock();
        Meteor.http.get(defaultURI + "env", function(err, result){
            if(err)
            {
                throw(err);
            }
            else
            {
                _.each(result.data, function(r){
                    Environments.insert(r);
                });
            }
        });
    }

});