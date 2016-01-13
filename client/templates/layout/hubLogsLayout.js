/**
 * Created by adm9360 on 11/12/2015.
 */

let searchCriteria = new Map();
const defaultStart = 0;
const defaultPageSize = 20;
const defaultNoRecords = 200;
Session.setDefault('PAGE_CURSOR', defaultStart);
Session.setDefault('PAGE_SIZE', defaultPageSize);

Template.hubLogsLayout.onCreated(function(){
    //this.subscribe('hublogs');
    this.selectedReqId = new ReactiveVar(null);
    //this.selectedMessId = new ReactiveVar(null);
    this.errsOnly = new ReactiveVar(null);
    this.olbPing = new ReactiveVar(null);
    this.pageSize = new ReactiveVar(defaultPageSize);
    this.nextPage = new ReactiveVar(null);
    this.prevPage = new ReactiveVar(null);
    this.code = new ReactiveVar(null);
    this.serviceId = new ReactiveVar(null);
    this.sourceName = new ReactiveVar(null);
    let options = {env: 'huba1'};
    loadHubLogs(options);
});

Template.hubLogsLayout.helpers({
    hubLogs: function() {
        let pageSize = Template.instance().pageSize.get();
        let selectedReq = Template.instance().selectedReqId.get();
        //let selectedMessId = Template.instance().selectedMessId.get();
        let errsOnly = Template.instance().errsOnly.get();
        let olbPing = Template.instance().olbPing.get();
        let nextPage = Template.instance().nextPage.get();
        let prevPage = Template.instance().prevPage.get();
        let code = Template.instance().code.get();
        let serviceId = Template.instance().serviceId.get();
        let sourceName = Template.instance().sourceName.get();
        if(selectedReq) {
            return HubLogs.find({REQUEST_ID: selectedReq});
        }
        //else if(selectedMessId){
        //    return HubLogs.find({MESSAGE_ID: selectedMessId});
        //}
        else if(code){
            return HubLogs.find({APPLICATION_CDE: code});
        }
        else if(serviceId){
            return HubLogs.find({SERVICE_ID: serviceId});
        }
        else if(sourceName){
            return HubLogs.find({SOURCE_NAME: sourceName});
        }
        if(nextPage) {
            return HubLogs.find({}, {skip: Number(Session.get('PAGE_CURSOR')), limit: Number(Session.get('PAGE_SIZE'))});
        }
        if(prevPage) {
            return HubLogs.find({}, {skip: Number(Session.get('PAGE_CURSOR')), limit: Number(Session.get('PAGE_SIZE'))});
        }
        return HubLogs.find({}, {limit: Number(Session.get('PAGE_SIZE'))});
    },

    next: function() {
        if((Number(Session.get('PAGE_CURSOR')) + Number(Session.get('PAGE_SIZE')) * 2) <= HubLogs.find({}).count()){
            return "Next " + (Number(Session.get('PAGE_CURSOR')) +  Number(Session.get('PAGE_SIZE'))) + " - "
                + (Number(Session.get('PAGE_CURSOR')) + Number(Session.get('PAGE_SIZE')) * 2);
        }
        return '';
    },

    prev: function() {
        if(Number(Session.get('PAGE_CURSOR') < Number(Session.get('PAGE_SIZE')) )) {
            return '';
        }
        return "Prev " + (Number(Session.get('PAGE_CURSOR')) - Number(Session.get('PAGE_SIZE'))) + " - "
            + (Number(Session.get('PAGE_CURSOR')));
    }

});


Template.hubLogsLayout.events({

    "click .req": function(event, template) {
        Template.instance().selectedReqId.set(this.REQUEST_ID);
        FlowRouter.setParams({requestId: this.REQUEST_ID});
        var field = template.find('next');
        if(field) {
            field.className = 'hide-link';
        }
        resetSessionDefaults();
    },
    //"click .messId": function(event, template) {
    //    Template.instance().selectedMessId.set(this.MESSAGE_ID);
    //    FlowRouter.setParams({messageId: this.MESSAGE_ID});
    //},

    "click .appCode": function(event, template){
        Template.instance().code.set(this.APPLICATION_CDE);
        FlowRouter.setParams({code: this.APPLICATION_CDE});
        resetSessionDefaults();
    },

    "click .srvcId": function(event, template){
        Template.instance().serviceId.set(this.SERVICE_ID);
        FlowRouter.setParams({serviceId: this.SERVICE_ID});
        resetSessionDefaults();
    },

    "click .srcName": function(event, template){
        Template.instance().sourceName.set(this.SOURCE_NAME);
        FlowRouter.setParams({sourceName: this.SOURCE_NAME});
        resetSessionDefaults();
    },

    "change #errsOnly": function(event, template) {
       var data = template.find('input[name=errorsOnly]:checked');
        if(data)
        {
            searchCriteria.set("errorsOnly", 1)
        }
        else
        {
            searchCriteria.delete("errorsOnly");
        }
    },

    "change #olbPing": function(event, template) {
        
        var data = template.find('input[name=olbPing]:checked');
        if(data)
        {
            searchCriteria.set("olbPing", 1);
        }
        else
        {
            searchCriteria.delete("olbPing");
        }
    },

    "click #btnSearch": function(event, template) {
        Template.instance().selectedReqId.set(null);
        //Template.instance().selectedMessId.set(null);

        var selectedApps = template.findAll("input[type=checkbox]:checked");
        if(selectedApps)
        {
            var apps = '';
            _.each(selectedApps, function(app){
                if(app.name === "errorsOnly" || app.name === "olbPing") {
                    searchCriteria.set(app.name, 1);
                }
                else
                {
                    if(apps === '')
                    {
                        apps = app.value;
                    }
                    else
                    {
                        apps = apps + ',' + app.value;
                    }
                }
            });
            if(apps != '')
            {
                searchCriteria.set("apps", apps);
                console.log(apps);
            }
        }

        var textInputs = template.findAll(".filter-input");
        _.each(textInputs, function(txtFld){
            if(txtFld.value)
            {
                searchCriteria.set(txtFld.name, txtFld.value);
                console.log(txtFld.name);
            }
        });
        let search = {};
        searchCriteria.forEach((val, key) => search[key] = val);
        loadHubLogs(search);
    },

    "click #clearFilter": function(event, template) {
        var checked = template.findAll("input[type=checkbox]:checked");
        searchCriteria.clear();
        _(checked).each(function(ckbx){
            ckbx.checked=false;
        });

        var inputs = template.findAll(".filter-input");
        _(inputs).each(function (field)
        {
            if(field.name === 'rowsPerPage') {
                field.value = defaultPageSize;
            }
            else if(field.name === 'noRecords') {
               field.value = defaultNoRecords;
            }
            else {
                field.value = '';
            }
        });

        resetSessionDefaults();
    },

    "click .prev": function(event, template) {
        if(Number(Session.get('PAGE_CURSOR') > (Number(Session.get('PAGE_SIZE'))) -1))
        {
            var start = Number(Session.get('PAGE_CURSOR')) - Number(Session.get('PAGE_SIZE'));
            Session.set('PAGE_CURSOR', start);
            Template.instance().prevPage.set(start);
            if(start === 0){
                event.preventDefault();
            }
        }
    },
    "click .next": function(event, template) {
        var start = Number(Session.get('PAGE_CURSOR')) + Number(Session.get('PAGE_SIZE'));
        Session.set('PAGE_CURSOR', start);
        Template.instance().nextPage.set(start);
    }

});

function resetSessionDefaults() {
    Session.set('PAGE_CURSOR', defaultStart);
    Session.set('PAGE_SIZE', defaultPageSize);
}

function loadHubLogs(options) {

    Meteor.call('getHubLogs', options, function(err, res) {
        if(err) {
            //show error
        } else {
            //hide spinner
            if(HubLogs.find().count() > 0){
                HubLogs.remove({});
            }
            _.each(res.data, function(r){
                HubLogs.insert(r);
            });
        }
    });
}

