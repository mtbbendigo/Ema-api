/**
 * Created by adm9360 on 10/12/2015.
 */

Template.environments.onCreated(function(){
    Meteor.subscribe('environments');
});

Template.environments.helpers({
    env: function () {
        return Environments.find();
    }
});