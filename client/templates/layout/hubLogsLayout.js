/**
 * Created by adm9360 on 11/12/2015.
 */
Template.hubLogsLayout.onCreated(function(){
    this.subscribe('hublogs');
    this.selectedReqId = new ReactiveVar(null);
    this.selectedMessId = new ReactiveVar(null);
});

Template.hubLogsLayout.helpers({
    hubLogs: function() {
        let selectedReq = Template.instance().selectedReqId.get();
        let selectedMessId = Template.instance().selectedMessId.get();
        if(selectedReq) {
            return HubLogs.find({REQUEST_ID: selectedReq});
        }
        else if(selectedMessId){
            console.log(selectedMessId);
            return HubLogs.find({MESSAGE_ID: selectedMessId});
        }
        return HubLogs.find();
    }
});
Template.hubLogsLayout.events({
   //"submit #SeachHubLogsForm": function(event, template)
   //{
   //    var selectedApps = template.findAll("input[type=checkbox]:checked");
   //    console.log(selectedApps);
   //    var array = _.map(selectedApps, function(app){
   //       return app.defaultValue;
   //    });
   //    console.log(array);
   //
   //},
    "click .req": function(event, template) {
        Template.instance().selectedReqId.set(this.REQUEST_ID);
        FlowRouter.setParams({requestId: this.REQUEST_ID});
    },
    "click .messId": function(event, template) {
        Template.instance().selectedMessId.set(this.MESSAGE_ID);
        FlowRouter.setParams({messageId: this.MESSAGE_ID});
    },
    "click #btnSearch": function(event, template) {
        Template.instance().selectedReqId.set(null);
        Template.instance().selectedMessId.set(null);
        Meteor.call('getHubLogs', function(err, res) {
            if(err) {
                //show error
            } else {
                //hide spinner
                var selectedApps = template.findAll("input[type=checkbox]:checked");
                console.log(selectedApps);
                var array = _.map(selectedApps, function(app){
                    return app.defaultValue;
                });
                console.log(array);
            }
        })
    },
    "click #clearFilter": function(event, template) {
        var checked = template.findAll("input[type=checkbox]:checked");
        console.log(checked);
        _(checked).each(function(ckbx){
            console.log(ckbx.checked=false);
        });
    }
});