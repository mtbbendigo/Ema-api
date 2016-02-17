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
    getApplications: getApplications
};


/*
 Functions in a127 controllers used for operations should take two parameters:

 Param 1: a handle to the request object
 Param 2: a handle to the response object
 */
function getHublogs(req, res) {
    //variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}

    var env = req.swagger.params.env.value;
    if(!env)
    {
        env = "huba1";
    }
    var dbConfig = undefined;
    if(isSQLServer) {
        //MSSQL Server
        dbConfig = dsConfig.HUBDatabase;
        var config = usHelper.findWhere(dbConfig, {name: env.toUpperCase()});
        datasource.searchHubLogs(config, req, function(err, result)
        {
            if(!err)
            {
                res.json(result);
            }
            else
            {
                res.json(err);
            }
        });
    }
    else {
        //MY SQL - Development environment
        dbConfig = dsConfig.MYSQL;
        var config = usHelper.findWhere(dbConfig, {name: "MYSQL"});
        mysqlds.searchHubLogs(config, req, function(err, result){
            if (!err) {
                res.json(result);
            }
            else
            {
                console.log(err);
            }
        });
    }
}

function getEnvironments(req, res)
{
    var dbConfig = undefined;
    if(isSQLServer) {
        //SQL Server
        dbConfig = dsConfig.EMADatabase;
        var config = usHelper.findWhere(dbConfig, {name: "EMA"});

        datasource.getEnvironments(config, function(err, result){
            if(!err)
            {
                res.json(result);
            }
            else
            {
                //console.log(err);
                res.json("An error occured getting Environments");
            }
        });
    }
    else {
        //MY SQL
        dbConfig = dsConfig.MYSQL;
        var config = usHelper.findWhere(dbConfig, {name: "MYSQL"});
        mysqlds.getEnvironments(config, function(err, result){
            if (!err) {
                res.json(result);
            }
            else
            {
                console.log(err);
            }
        });
    }
}


function getApplications(req, res)
{
    var env = req.swagger.params.env.value;
    if(!env)
    {
        env = "huba1";
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
                res.json(result);
            }
            else
            {
                res.json(err);
            }
        });
    }
    else {
        //MY SQL
        dbConfig = dsConfig.MYSQL;
        var config = usHelper.findWhere(dbConfig, {name: "MYSQL"});
        mysqlds.getHubConsumers(config, function(err, result){
            if (!err) {
                res.json(result);
            }
            else
            {
                console.log(err);
            }
        });
    }

}
