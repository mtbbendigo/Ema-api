/**
 * Created by adm9360 on 1/12/2015.
 */
'use strict';
var sql = require("mssql");

module.exports = {
    searchHubLogs: searchHubLogs,
    getEnvironments: getEnvironments,
    getHubConsumers: getHubConsumers,
    getSlogans: getSlogans
};


function extractLogsParamsFromRequest(req, callback)
{
    var startPos = (req.swagger.params.start.value) ? req.swagger.params.start.value:0;
    var resultSetSize = (req.swagger.params.noRecords.value) ? req.swagger.params.noRecords.value:200;
    var reqID = (req.swagger.params.requestId.value) ? req.swagger.params.requestId.value:null;
    var srvID = (req.swagger.params.serviceId.value) ? req.swagger.params.serviceId.value:null;
    var srcName = (req.swagger.params.sourceName.value) ? req.swagger.params.sourceName.value:null;
    var user = (req.swagger.params.userId.value) ? req.swagger.params.userId.value:null;
    var sev = (req.swagger.params.severity.value) ? req.swagger.params.severity.value:null;
    var cde = (req.swagger.params.code.value) ? req.swagger.params.code.value:null;
    var date = (req.swagger.params.latestDate.value) ? req.swagger.params.latestDate.value:null;
    var appss = (req.swagger.params.apps.value) ? req.swagger.params.apps.value:null;
    var reqMess = (req.swagger.params.requestMessage.value) ? req.swagger.params.requestMessage.value:null;
    var log = (req.swagger.params.logMessage.value) ? req.swagger.params.logMessage.value:null;
    var errs = (req.swagger.params.errorsOnly.value) ? req.swagger.params.errorsOnly.value:null;
    var ping = (req.swagger.params.includeOlbPing.value) ? req.swagger.params.includeOlbPing.value:null;

    var logsRequest = {
        startIndex: startPos,
        rss: resultSetSize,
        reqeustId: reqID,
        serviceId: srvID,
        sourceName: srcName,
        userId: user,
        severityCode: sev,
        logCode: cde,
        requestDate: date,
        applications: appss,
        requestMessage: reqMess,
        logMessage: log,
        errorsOnly: errs,
        includeOlbPing: ping
    }
    callback(null, logsRequest);
}

//The mssql npm package expects all parameters to a stored procedure even if the parameter values are null.
function searchHubLogs(datasource, params, cb)
{
    extractLogsParamsFromRequest(params, function(err, result){
        var conn = new sql.Connection(datasource, function(err){

            if(err !== null)
            {
                console.log("Connection to database failed.")
                return;
            }
            else
            {
                var request = new sql.Request(conn);
                request.input('startIndex', sql.Int, result.startIndex);
                request.input('resultSizeLimit', sql.Int, result.rss);
                request.input('requestId', sql.Int, result.reqeustId);
                request.input('serviceId', sql.Int, result.serviceId);
                request.input('sourceName', sql.VarChar(50), result.sourceName);
                request.input('userId', sql.VarChar, result.userId);
                request.input('severityCode', sql.VarChar, result.severityCode);
                request.input('logCode', sql.VarChar, result.logCode);
                request.input('requestDate', sql.DateTime, result.requestDate);
                request.input('applications', sql.VarChar, result.applications);
                request.input('requestMessage', sql.VarChar(100), result.requestMessage);
                request.input('logMessage', sql.VarChar(100), result.logMessage);
                request.input('errorsOnly', sql.Bit, result.errorsOnly);
                request.input('includeOlbPing', sql.Bit, result.includeOlbPing);

                request.execute('pGetHubLogs', function(err, recordsets, returnValue) {

                    if(!err === null)
                    {
                        var no = (err.number !== null) ? err.number:0;
                        var name = (err.name !== null) ? err.name:"";
                        var code = (err.code !== null) ? err.code:"";
                        var message = (err.message != null) ? err.message:"";
                        var errorMessage = "Fatal Error occured.\nNumber: " + no + "\nName: " + name + "\nCode: " + code + "\nMessage: " + message;
                        console.log(cb, errorMessage);
                        //TODO: create a callback with the error?
                        cb(err, errorMessage);
                    }
                    else
                    {
                        //The returned ResultSet contains two arrays, one containing the rows, the other the returned value.
                        //Swagger will barf at the non-defined array, just return the array you need.
                        cb(null, recordsets[0]);
                    }
                    conn.close();
                });
            }
        });
    });
}

function getEnvironments(datasource, callback)
{
    var conn = new sql.Connection(datasource, function(err){
        if(err)
        {
            console.log(err);
            console.log("Connection to database failed.");
        }
        else
        {
            var request = new sql.Request(conn);
            request.execute("pGetAllEnvironments", function(err, recordsets, returnValue){
                if(!err === null)
                {
                    var no = (err.number !== null) ? err.number:0;
                    var name = (err.name !== null) ? err.name:"";
                    var code = (err.code !== null) ? err.code:"";
                    var message = (err.message != null) ? err.message:"";
                    var errorMessage = "Fatal Error occured.\nNumber: " + no + "\nName: " + name + "\nCode: " + code + "\nMessage: " + message;
                    console.log(callback, errorMessage);
                }
                else
                {
                    callback(null, recordsets[0]);
                }
                conn.close();
            });
        }
    });
}

function getHubConsumers(datasource, callback)
{
    var conn = new sql.Connection(datasource, function(err){
        if(err !== null)
        {
            console.log("Connection to database failed.")
            return;
        }
        else
        {
            var request = new sql.Request(conn);
            request.execute("pGetApplicationConsumers", function(err, recordsets, returnValue){
                if(!err === null)
                {
                    var no = (err.number !== null) ? err.number:0;
                    var name = (err.name !== null) ? err.name:"";
                    var code = (err.code !== null) ? err.code:"";
                    var message = (err.message != null) ? err.message:"";
                    var errorMessage = "Fatal Error occured.\nNumber: " + no + "\nName: " + name + "\nCode: " + code + "\nMessage: " + message;
                    //console.log(callback, errorMessage);
                    callback(err, errorMessage);
                }
                else
                {
                    callback(null, recordsets[0]);
                }
                conn.close();
            });
        }
    });
}

function getSlogans(config, callback)
{
    var conn = new sql.Connection(datasource, function(err){
        if(err !== null) {
            console.log("Connection to database failed.")
            return;
        }
        else {
            var request = new sql.Request(conn);
            request.execute("pGetSlogans", function(err, recordsets, returnValue) {
                if(!err === null)
                {
                    var no = (err.number !== null) ? err.number:0;
                    var name = (err.name !== null) ? err.name:"";
                    var code = (err.code !== null) ? err.code:"";
                    var message = (err.message != null) ? err.message:"";
                    var errorMessage = "Fatal Error occured.\nNumber: " + no + "\nName: " + name + "\nCode: " + code + "\nMessage: " + message;
                    //console.log(callback, errorMessage);
                    callback(err, errorMessage);
                }
                else
                {
                    callback(null, recordsets[0]);
                }
                conn.close();
            });
        }
    });
}

sql.on('error', function(err) {
    // ... error handler
    console.log(err);
    connection.close();
});

