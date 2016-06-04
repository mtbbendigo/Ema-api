/**
 * Created by adm9360 on 27/11/2015.
 */

var mysql = require('mysql');

module.exports = {
    searchHubLogs: searchHubLogs,
    getEnvironments: getEnvironments,
    getHubConsumers: getHubConsumers,
    getSlogans: getSlogans
};

//var configg = {
//    "name": "HUBA1",
//    "host": "localhost",
//    "user": "root",
//    "password": "Iluv2java2",
//    "database": "ema"
//}

//var s = searchHubLogs(configg, "", function(){});

function isNotNullOrUndefined(value)
{
    return value !== null && value !== undefined;
}

function searchHubLogs(config, req, callback)
{
    //Replace this with a map?
    var startPos = (req.swagger.params.start.value) ? req.swagger.params.start.value:0;
    var resultSetSize = (req.swagger.params.noRecords.value) ? req.swagger.params.noRecords.value:200;
    var reqID = (req.swagger.params.requestId.value) ? req.swagger.params.requestId.value:null;
    var srvID = (req.swagger.params.serviceId.value) ? req.swagger.params.serviceId.value:null;
    var srcName = isNotNullOrUndefined(req.swagger.params.sourceName.value) ? "'" + req.swagger.params.sourceName.value + "'":null;
    var user = isNotNullOrUndefined(req.swagger.params.userId.value) ? "'" + req.swagger.params.userId.value + "'":null;
    var sev = isNotNullOrUndefined(req.swagger.params.severity.value) ? "'" +  req.swagger.params.severity.value + "'":null;
    var cde = isNotNullOrUndefined(req.swagger.params.code.value) ? "'" + req.swagger.params.code.value + "'":null;
    var date = isNotNullOrUndefined(req.swagger.params.latestDate.value) ? "'" + req.swagger.params.latestDate.value + "'":null;
    var appss = isNotNullOrUndefined(req.swagger.params.apps.value) ? "'" + req.swagger.params.apps.value + "'":null;
    //console.log(appss.length);
    if((appss !== null && appss !== undefined) && appss.length > 5) {
        console.log(appss);
        console.log("split");
        var app = appss.split(",");
        appss = app[0] + "'";
        console.log(appss);
    }
    var reqMess = isNotNullOrUndefined(req.swagger.params.requestMessage.value) ? "'" + req.swagger.params.requestMessage.value + "'":null;
    var log = isNotNullOrUndefined(req.swagger.params.logMessage.value) ? "'" + req.swagger.params.logMessage.value + "'":null;
    var errs = (req.swagger.params.errorsOnly.value) ? req.swagger.params.errorsOnly.value:0;
    var ping = (req.swagger.params.includeOlbPing.value) ? req.swagger.params.includeOlbPing.value:0;

    var connection = mysql.createConnection(config);
    connection.connect(function(err){
        if(err){
            console.error('Error Connecting to database: ' + err.stack);
            return;
        }
        var request = "CALL pGetHubLogs(" + startPos + ", " + resultSetSize + ", " + reqID + ", " +
            srvID + ", " + srcName + ", " + user + ", " + sev + ", " + cde + ", " +
            date + ", " + appss + ", " + reqMess + ", " + log +", " + errs + ", " +
            ping + ")";
        connection.query(request, function(err, rows, fields)

        {
            if(err)
            {
                callback(err, null);
            }
            else
            {
                return callback(null, rows[0]);
            }
        });
        connection.end();
    });
}

function getHubConsumers(config, callback)
{
    var connection = mysql.createConnection(config);
    connection.connect(function(err){
        if(err){
            console.error('Error Connecting to database: ' + err.stack);
            return;
        }
        connection.query("CALL pGetApplicationConsumers()", function(err, rows, fields)
        {
            if(err)
            {
                callback(err, null);
            }
            else
            {
                return callback(null, rows[0]);
            }
        });
        connection.end();
    });
}

function getEnvironments(config, callback)
{
    var connection = mysql.createConnection(config);
    connection.connect(function(err){
        if(err){
            console.error('Error Connecting to database: ' + err.stack);
            return;
        }
        connection.query("CALL pGetAllEnvironments()", function(err, rows, fields)
        {
            if(err)
            {
                callback(err, null);
            }
            else
            {
                return callback(null, rows[0]);
            }
        });
        connection.end();
    });
}

function createPooledConnection()
{
    var config = getConfig(true);
    config.getConnection(function(error, co){
        if(!error)
        {
            return co;
        }
        else
        {
            console.log("Code: " + error.code + "\nErrorno: " + error.errno + "\nSQLState: " + error.sqlState);
        }
    });
}

function getSlogans(config, callback)
{
    var conn = mysql.createConnection(config);
    conn.connect();
    conn.query("CALL pGetSlogans()", function(err, rows){
        if(err)
        {
            callback(err, null);
        }
        else
        {
            return callback(null, rows[0]);
        }
    });
    conn.end();
}