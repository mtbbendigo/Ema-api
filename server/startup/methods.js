var baseUrl = "http://localhost:10010/ema/";

Meteor.methods({
    getEnvironments: function() {
        var data = Meteor.http.call("GET", baseUrl + "env", function(error, result){
            if(error)
            {
                console.log('Error: ' + error)
            }
            else
            {
                return result;
            }
        });
    },

    getHubLogs: function(parameters) {
        console.log("Get hublogs called.");
        var request = baseHubLogsParams;
        if(!parameters)
        {
           parameters = {requestId: 746655};
        }
        Meteor.http.call("GET", baseUrl + "hublogs", {params: parameters}, function(err, result){
            if(err)
            {
                console.log(err);
            }
            else
            {
                //console.log(result.data);
                //_.each(result.data, function(r){
                //   Items.insert(r);
                //});
                return result.data;
            }
        });
    }
});