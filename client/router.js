/**
 * Created by adm9360 on 10/12/2015.
 */

BlazeLayout.setRoot('body');

FlowRouter.route('/', {
    name: 'home',
    action: function() {
        BlazeLayout.render("hubLogsLayout");
    }
});

///ema/hublog?env=huba1
//FlowRouter.route('/ema/hublog/:env', {
//    name: 'searchHubLogs',
//    params: {env: "huba1"},
//    queryParams: {start: 0, size:200},
//    action: function(params, queryParams) {
//        BlazeLayout.render("hubLogsLayout", {content: "hublogRow"});
//    }
//});

//var hubLogs = FlowRouter.group({
//    prefix: '/ema'
//});
//
//hubLogs.route('/', {
//    action: function() {
//        console.log('We are viewing hublogs page');
//    }
//});
//
//hubLogs.route('/hublogs', {
//    action: function(params, queryParams) {
//        console.log('abcd' + params);
//        console.log(queryParams);
//        BlazeLayout.render("hubLogsLayout");
//    }
//});

//FlowRouter.route('/ema/hublog', {
//    action: function() {
//        console.log("Were on the hublog page");
//    }
//});



//Pages = new Meteor.Pagination(HubLogs, {
//    route: "/hublog/",
//    perPage: 20,
//    router: "iron-router",
//    routerTemplate: "hubLogs",
//    routerLayout: "hubLogsLayout",
//    itemTemplate: "hublogRow",
//    sort: {
//        LOG_ID: 1
//    },
//    divWrapper: false,
//    templateName: "hubLogs"
//});


//Router.configure({
//    //searchHubLogs: 'hublog',
//    loadingTemplate: 'loading',
//    notFoundTemplate: 'notFound',
//    waitOn: function() {return Meteor.subscribe('hublogs');}
//});

//Router.route('/', function(){this.render('');});

//Router.route('ema/hublog/:REQUEST_ID', {
//    name: 'searchByReqId',
//    template: 'hubLogsLayout',
//    data: function() {
//        var reqId = this.params.REQUEST_ID;
//        console.log("RequestId: " + reqId);
//        //var env = Session.get("selectedHubEnv");
//        //var request = {env: env, requestId: reqId};
//        //console.log(request.env + request.requestId);
//        //return Meteor.call("getHubLogs", request);
//        //return HubLogs.find({REQUEST_ID: this.params.REQUEST_ID});
//
//    }
//});

//Router.route('/ema/hublog/requestId/:REQUEST_ID', function () {
//    console.log("helloworld " + this.params.REQUEST_ID);
//    var hublog = {requestId: this.params.REQUEST_ID, env: Session.get("selectedHubEnv")};
//    Meteor.call("getHubLogs", hublog);
//    //var item = Items.findOne({_id: this.params._id});
//    //this.render('ShowItem', {data: item});
//    //let hublogs = HubLogs.find({REQUEST_ID: this.params.REQUEST_ID});
//    this.render('hubLogsLayout', hublog);
//});


/*Router.route('/', function() {
    Meteor.call('getHubLogs', {env: Session.get('selectedHubEnv')});
    this.render('hubLogsLayout')
});*/

//Router.route('slogans');

//Router.route('/test/:REQUEST_ID',
//{
//    name: 'test',
//    template: 'test',
//    data: function() {
//        var req = this.params.REQUEST_ID;
//        console.log(req);
//    }
//});

