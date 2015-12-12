/**
 * Created by adm9360 on 11/12/2015.
 */


Template.hubLogsLayout.events({
   "submit #SeachHubLogsForm": function(event, template)
   {
       event.preventDefault();
       //console.log(event);
       var selectedApps = template.findAll("input[type=checkbox]:checked");
       var array = _.map(selectedApps, function(app){
          return app.defaultValue;
       });
       console.log(array);
   }
});