/**
 * Created by adm9360 on 10/12/2015.
 */

Meteor.publish('environments', function() {
    return Environments.find();
})

Meteor.publish('slogans', function() {
    return Slogans.find();
});