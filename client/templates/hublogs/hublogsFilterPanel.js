/**
 * Created by holly on 12/11/2015.
 */

var defaultURI = "http://localhost:10010/ema/";
let defaultEnv = {env: 'huba1'};

Template.hublogsFilterPanel.onCreated(function(){
    loadApplications(defaultEnv);
    //Mteteor.autorun is a re-active context meaning everything inside will get re-run if a reactive data source changes inside
    //Meteor.autorun(function() {
    //    Meteor.subscribe("messages", Session.get("current_channel"));
    //});

});

Template.hublogsFilterPanel.helpers({
    applications: function() {
        //fetch turns the retrieved data into an array
        var allApplications = [];
        allApplications = Applications.find().fetch();
        var rows = [];
        var noCols = 2;
        var count = 0;
        while(allApplications.length > noCols)
        {
            count = allApplications.length;
            if(count == 1)
            {
                rows.push({row: allApplications.slice(0, 1)});
                allApplications = allApplications.slice(1);
            }
            else
            {
                rows.push({row: allApplications.slice(0, noCols)});
                allApplications = allApplications.slice(noCols);
            }

        }
        rows.push({row: allApplications});
        return rows;
    }
});

Template.hublogsFilterPanel.events()
{

}

function loadApplications(params) {
    console.log(params);
    Meteor.call('getApplications', params, function(err, result){
        if(err) {
            throw(err);
        }
        else {
            _.each(result.data, function(r){
                Applications.insert(r);
            });
        }
    });
}