/**
 * Created by adm9360 on 17/11/2015.
 */
'use strict';

var util = require('util');
var dsConfig = require.main.require('./config/config.js');
var usHelper = require("underscore");
var datasource = require.main.require('./api/helpers/mssql-datasource.js');
var mysqlds = require.main.require('./api/helpers/mysql-datasource.js');
var EMA_DB = "EMA";


var isSQLServer = false;

module.exports = {
    getHublogs: getHublogs,
    getEnvironments: getEnvironments,
    getApplications: getApplications,
    getServicePerformanceStats: getServicePerformanceStats
};


/*
 Functions in a127 controllers used for operations should take two parameters:

 Param 1: a handle to the request object
 Param 2: a handle to the response object
 */
function getHublogs(req, res, next) {
    //variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var env = req.swagger.params.env.value;
    var dbConfig = undefined;
    if(isSQLServer) {
        //MSSQL Server
        dbConfig = dsConfig.HUBDatabase;
        var config = usHelper.findWhere(dbConfig, {name: env.toUpperCase()});
        datasource.searchHubLogs(config, req, function(err, result)
        {
            if(!err)
            {
                res.status(200).send(json(result));
            }
            else
            {
                returnError(res, 500, err);
            }
        });
    }
    else {
        //MY SQL - Development environment
        dbConfig = dsConfig.MYSQL;
        console.log(dbConfig);
        if(!usHelper.contains(dbConfig, env)) {
            env = "EMA_DEV";
        }
        var config = usHelper.findWhere(dbConfig, {name: env});
        mysqlds.searchHubLogs(config, req, function(err, result){
            if (!err)
            {
                res.status(200).send(json(result));
            }
            else
            {
                returnError(res, 500, err);
            }
        });
    }
}

function getEnvironments(req, res)
{
    var id = req.swagger.params.id.value;
    var errMsg = {message: "Parameter " + id + " does not match any environments"};
    var invalidConfig = "Config could not be created";
    var dbConfig = undefined;
    if(isSQLServer) {
        dbConfig = dsConfig.EMADatabase;
    }
    else {
        dbConfig = dsConfig.MYSQL;
    }

    // if(!usHelper.contains(dbConfig, id))
    // {
    //     returnError(res, 400, errMsg);//res.status(400).send(err);
    //     return;
    // }

    if(isSQLServer){
        var config = usHelper.findWhere(dbConfig, {name: id});
        if(config){
            datasource.getEnvironments(config, function(err, result){
                if(!err)
                {
                    res.status(200).send(json(result));
                }
                else
                {
                    returnError(res, 500, err);
                }
            });
        }
        else {
            returnError(res, 500, invalidConfig);
        }
    }
    else {
        var config = usHelper.findWhere(dbConfig, {name: id});
        if(config){
            mysqlds.getEnvironments(config, function(err, result){
                if (!err) {
                    res.status(200).send(json(result));
                }
                else
                {
                    returnError(res, 500, err);
                }
            });
        }
        else {
            returnError(res, 500, invalidConfig);
        }
    }
}


function getApplications(req, res)
{
    var env = req.swagger.params.env.value;
    if(!env)
    {
        env = "hubld";
    }
    var dbConfig = undefined;
    if(isSQLServer) {
        //MSSQL Server
        dbConfig = dsConfig.HUBDatabase;
        var config = usHelper.findWhere(dbConfig, {name: env.toUpperCase()});
        datasource.getHubConsumers(config, function(err, result)
        {
            if(!err)
            {
                res.status(200).send(json(result));
            }
            else
            {
                //console.log(JSON.stringify(err));
                res.json(err);
            }
        });
    }
    else {
        //MY SQL
        dbConfig = dsConfig.MYSQL;
        if(!usHelper.contains(dbConfig, env)) {
            env = "EMA_DEV";
        }
        var config = usHelper.findWhere(dbConfig, {name: env});
        mysqlds.getHubConsumers(config, function(err, result){
            if (!err) {
                res.status(200).send(json(result));
            }
            else
            {
                //console.log(JSON.stringify(err));
                res.json(err);
            }
        });
    }

}

function getServicePerformanceStats(req, res){
    var env = req.swagger.params.env.value;
    if(!env)
    {
        env = "hubld";
    }
    var dbConfig = undefined;
    var reqId = req.swagger.params.requestId.value;
    //MSSQL Server
    dbConfig = dsConfig.HUBDatabase;
    var config = usHelper.findWhere(dbConfig, {name: env.toUpperCase()});
    datasource.getServicePerformanceStats(config, reqId, function(err, result)
    {
        if(!err)
        {
            res.status(200).send(json(result));
        }
        else
        {
            //console.log(JSON.stringify(err));
            res.json(err);
        }
    });
}

function returnError(res, statusCode, error)
{
    res.status(statusCode).send(error);
}
