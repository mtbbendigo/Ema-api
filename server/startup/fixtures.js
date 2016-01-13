/**
 * Created by adm9360 on 10/12/2015.
 */

var defaultParams = {params: {env: 'huba1'}};
var defaultURI = "http://localhost:10010/ema/";

Meteor.startup(function() {
    //Applications.remove({});
    Environments.remove({});
    Slogans.remove({});
    //HubLogs.remove({});

    //if(Applications.find().count() === 0) {
    //    Applications._ensureIndex({ID: 1});
    //    Meteor.http.get(defaultURI + "apps", defaultParams, function(err, result){
    //        if(err) {
    //            throw(err);
    //        }
    //        else {
    //            _.each(result.data, function(r){
    //                Applications.insert(r);
    //            });
    //        }
    //    });
    //}

    if(Environments.find().count() === 0) {
        Environments._ensureIndex({ID: 1});
        Meteor.http.get(defaultURI + "env", function(err, result){
            if(err) {
                console.log(err);
            }
            else {
                _.each(result.data, function(environment){
                    Environments.insert(environment);
                });
            }
        });
    }

    if(Slogans.find().count() === 0) {
        Slogans._ensureIndex({ID: 1});
        Slogans.insert({
            id: 1,
            description: 'Searches are on us'
        });

        Slogans.insert({
            id: 2,
            description: 'Your\'ve won a power search'
        });
        Slogans.insert({
            id: 3,
            description: 'Let us find it for you'
        });
        Slogans.insert({
            id: 4,
            description: 'Im feeling lucky'
        });
    }

    //if(HubLogs.find().count() === 0) {
    //
    //    Meteor.http.get(defaultURI + "hublog", defaultParams, function(err, res){
    //       if(err){
    //           throw(err);
    //       }
    //       else {
    //           _.each(res.data, function(h){
    //              HubLogs.insert(h);
    //           });
    //       }
    //    });
    //}
});



