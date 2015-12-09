/**
 * Created by adm9360 on 10/12/2015.
 */

Meteor.publish('applications', function() {
    return Applications.find();
});

Meteor.publish('environments', function() {
    return Environments.find();
})

//Meteor.publish('hubLogs', function(){
//   return HubLogs.find();
//});

Meteor.publish('hublogs', function(){
    return HubLogs.find();
});

Meteor.publish('hublogsSlogans', function() {
    return HublogsSlogans.find();
});