/**
 * Created by adm9360 on 10/12/2015.
 */

//Set selected environment to its default value.
Template.environments.onCreated(function(){
    Session.set("selectedHubEnv", "huba1");
    Meteor.subscribe('environments');
});

Template.environments.helpers({
    env: function () {
        return Environments.find();
    }
});

Template.environments.events({
   "change #hubEnvironments": function(event, template)
   {
       Session.set("selectedHubEnv", template.$("#hubEnvironments").val());
   }
});