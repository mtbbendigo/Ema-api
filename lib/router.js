/**
 * Created by adm9360 on 10/12/2015.
 */




Pages = new Meteor.Pagination(HubLogs, {
    route: "/hublog/",
    perPage: 20,
    router: "iron-router",
    routerTemplate: "hubLogs",
    routerLayout: "hubLogsLayout",
    itemTemplate: "hublogs-row",
    sort: {
        LOG_ID: 1
    },
    divWrapper: false,
    templateName: "hubLogs"
});


Router.configure({
    //searchHubLogs: 'hublog',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {return Meteor.subscribe('hublogs');}
});

Router.route('/hublog/:REQUEST_ID', {
    name: 'hublog',
    template: 'hubLogsLayout',
    data: function() {
        var reqId = this.params.REQUEST_ID;
        var env = Session.get("selectedHubEnv");
        var request = {env: env, requestId: reqId};
        return Meteor.call("getHubLogs", request);
        //return HubLogs.find({REQUEST_ID: this.params.REQUEST_ID});
    }
});


Router.route('slogans');

Router.route('/test/:REQUEST_ID',
{
    name: 'test',
    template: 'test',
    data: function() {
        var req = this.params.REQUEST_ID;
        console.log(req);
    }
});

