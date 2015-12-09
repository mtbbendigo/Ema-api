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

    getHubLogs: function() {
        console.log("Get hublogs called by client.");
        Meteor.http.call("GET", baseUrl + "hublogs", {params: {env: "huba1", start: 0, size: 200}}, function(err, result){
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