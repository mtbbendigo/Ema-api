/**
 * Created by adm9360 on 10/12/2015.
 */

Pages = new Meteor.Pagination(Items, {
    route: "/hublogs/",
    perPage: 20,
    router: "iron-router",
    routerTemplate: "hubLogs",
    routerLayout: "hubLogsLayout",
    sort: {
        id: 1
    },
    templateName: "hubLogs"
});


Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {return Meteor.subscribe('hublogs');}
});

Router.route('register');

Router.route('slogans');