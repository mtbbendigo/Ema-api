/**
 * Created by adm9360 on 10/12/2015.
 */

Pages = new Meteor.Pagination(HubLogs, {
    route: "/hublogs/",
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
    layoutTemplate: 'test',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {return Meteor.subscribe('hublogs');}
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