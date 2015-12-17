/**
 * Created by adm9360 on 10/12/2015.
 */

HubLogs = new Meteor.Collection("hublogs");

HubLogs.loadFromDataSource = function() {
    let request = {env: "huba1", requestId: 739616};
    Meteor.http.get("http://localhost:10010/ema/hublog", function(err, results){
        if(err)
        {
            console.log("Error getting hublogs: " + err);
        }
        else
        {
            HubLogs.remove({});
            //console.log(results.data);
            _.each(results.data, function(r){
                HubLogs.insert(r);
            });
        }
    });
};

Applications = new Mongo.Collection('applications');

Applications.loadFromDataSource = function()
{
    Meteor.http.get("http://localhost:10010/ema/apps", {params: {env: "huba1"}}, function(err, result){
        if(!err)
        {
            _.each(result.data, function(r){
                Applications.insert(r);
            });
        }
        else
        {
            console.log("Error getting Applications: " + err);
        }
    });
}


Environments = new Mongo.Collection('environments');

Environments.loadFromDataSource = function() {
    var env = Meteor.http.call("GET", "http://localhost:10010/ema/env", function(err, result){
        if(err)
        {
            console.log(err);
        }
        else
        {
            _.each(result.data, function(environment){
                Environments.insert(environment);
            });
        }

    });
};

HublogsSlogans = new Mongo.Collection('hublogsSlogans');