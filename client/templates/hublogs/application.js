/**
 * Created by adm9360 on 10/12/2015.
 */

Template.application.events({
    "click #id": function(event, template){
        console.log(this.ID);
    }
});