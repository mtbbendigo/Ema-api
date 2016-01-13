
//Meteor.methods({
//    getApplications: function(paramters) {
//        Meteor.http.get("http://localhost:10010/ema/apps", {params: {env: "huba1"}}, function(err, result){
//            if(!err)
//            {
//                _.each(result.data, function(r){
//                    Applications.insert(r);
//                });
//            }
//            else
//            {
//                console.log("Error getting Applications: " + err);
//            }
//        });
//    },
//
//    getHubLogs: function(parameters) {
//        console.log("Printing params " + parameters);
//        _.each(parameters, function(p){console.log("p: " + p.data)});
//        //HubLogs.loadFromDataSource();
//        Meteor.http.get("http://localhost:10010/ema/hublog", params(parameters), function(err, results){
//            if(err)
//            {
//                console.log("Error getting hublogs: " + err);
//            }
//            else
//            {
//                console.log("Getting source");
//                HubLogs.remove({});
//                _.each(results.data, function(r){
//                        HubLogs.insert(r);
//                });
//            }
//        });
//
//
//    },
//
//    getEnvironments: function() {
//        Meteor.http.get("http://localhost:10010/ema/env", function(err, result){
//            if(!err)
//            {
//                _.each(result.data, function(r){
//                    Applications.insert(r);
//                });
//            }
//            else
//            {
//                console.log("Error getting Applications: " + err);
//            }
//        });
//    }
//
//});