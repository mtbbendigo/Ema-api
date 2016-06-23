/**
 * Created by adm9360 on 17/11/2015.
 */
'use strict';

//Export functions for swagger to call them.
module.exports = {
    getHublogs: getHublogs,
    getEnvironments: getEnvironments,
    getApplications: getApplications,
    getServicePerformanceStats: getServicePerformanceStats
};

var uns = require("underscore");
var util = require('util');
var region = process.env.Region; //Server defined
var validator = require.main.require('./api/helpers/validator.js');
var dsConfig = undefined;
var datasource = undefined;
if(region === 'DEV' || region === 'DTL'){
    dsConfig = require.main.require('./config/config.js');
}
else if(region === 'PROD'){
    dsConfig = {"EMADatabase": [{"id": process.env.Region, "name": process.env.emaName, "user": process.env.emaUser, "password": process.env.emaPassword, "server": process.env.emaServer, "database": process.env.emaDatabase }],
        "HUBDatabase": [{"name": process.env.pName, "user": process.env.pUser, "password": process.env.pPassword, "server": process.env.pServer, "port": process.env.pPort, "database": process.env.pDatabase }]};
}

var isSQLServer = process.env.isSQLServer;
if(isSQLServer.toLowerCase() === 'true'){
    datasource = require.main.require('./api/helpers/mssql-datasource.js');
}
else {
    var mySqlDs = require.main.require('./api/helpers/mysql-datasource.js');
}

const RESPONSE_CODES = {OK : 200, BAD_REQUEST : 400, UNAUTHORIZED : 401, FORBIDDEN : 403, NOT_FOUND : 404, TIME_OUT : 408, INTERNAL_SERVER_ERROR : 500};
const ERROR_MESSAGES = {BAD_REQUEST: "Error: An Error Occurred.", UNAUTHORIZED: "Error: Unauthorized Access Denied!", FORBIDDEN: "Error: Permission Denied! Bugger off please.", NOT_FOUND: "Error: Resource not found.", TIME_OUT: "Error: The server timed out waiting for the request.", INTERNAL_SERVER_ERROR: "Error: Internal Server Error"};
const DB_CONFIG_NOT_FOUND = "DBConfig does not exist.";

/*
 Functions in a127 controllers used for operations should take two parameters:

 Param 1: a handle to the request object
 Param 2: a handle to the response object
 */
function getHublogs(req, res, next) {
    //variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    var env = req.swagger.params.env.value.toUpperCase();
    var dbConfig = undefined;
    if(isSQLServer) {
        dbConfig = dsConfig.HUBDatabase;
    }
    else {
        dbConfig = dsConfig.MYSQL;
    }

    var config = uns.findWhere(dbConfig, {name: env});
    if(!config){
        console.log(DB_CONFIG_NOT_FOUND);
        returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.BAD_REQUEST);
        return;
    }

    if(isSQLServer) {
        //MSSQL Server
        datasource.searchHubLogs(config, req, function(err, result)
        {
            if(!err)
            {
                res.status(RESPONSE_CODES.OK);
                res.json(result);
            }
            else
            {
                console.log(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
    else {
        //MY SQL - Development environment
        mySqlDs.searchHubLogs(config, req, function(err, result){
            if (!err)
            {
                res.status(RESPONSE_CODES.OK);
                res.json(result);
            }
            else
            {
                console.log(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
}

function getEnvironments(req, res)
{
    var dbConfig = '';
    if(isSQLServer) {
        dbConfig = dsConfig.EMADatabase;
    }
    else {
        dbConfig = dsConfig.MYSQL;
    }

    var config = uns.findWhere(dbConfig, {id: region});
    if(!config){
        console.log(DB_CONFIG_NOT_FOUND);
        returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.BAD_REQUEST);
        return;
    }
    if(isSQLServer){
        datasource.getEnvironments(config, function(err, result){
            if(!err)
            {
                res.status(RESPONSE_CODES.OK);
                res.json(result);
            }
            else
            {
                console.log(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
    else {
        mySqlDs.getEnvironments(config, function(err, result){
            if (!err) {
                res.status(RESPONSE_CODES.OK);
                res.json(result);
            }
            else
            {
                console.log(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
}


function getApplications(req, res)
{
    var env = req.swagger.params.env.value.toUpperCase();
    var dbConfig = undefined;
    if(isSQLServer){
        dbConfig = dsConfig.HUBDatabase;
    }
    else {
        dbConfig = dsConfig.MYSQL;
    }

    var config = uns.findWhere(dbConfig, {name: env});
    if(!config){
        console.log(DB_CONFIG_NOT_FOUND);
        returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.BAD_REQUEST);
        return;
    }

    if(isSQLServer) {
        //MSSQL Server
        datasource.getHubConsumers(config, function(err, result)
        {
            if(!err)
            {
                res.status(RESPONSE_CODES.OK);
                res.json(result);
            }
            else
            {
                console.log(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
    else {
        //MY SQL
        mySqlDs.getHubConsumers(config, function(err, result){
            if (!err) {
                res.status(RESPONSE_CODES.OK);
                res.json(result);
            }
            else
            {
                console.log(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
}

function getServicePerformanceStats(req, res){
    var env = req.swagger.params.env.value.toUpperCase();
    var reqId = req.swagger.params.requestId.value;
    var dbConfig = undefined;
    if(isSQLServer){
        dbConfig = dsConfig.HUBDatabase;
    }
    else {
        dbConfig = dsConfig.MYSQL;
    }

    var config = uns.findWhere(dbConfig, {name: env});
    if(!config){
        console.log(DB_CONFIG_NOT_FOUND);
        returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.BAD_REQUEST);
        return;
    }

    //MSSQL Server
    if(isSQLServer){
        datasource.getServicePerformanceStats(config, reqId, function(err, result)
        {
            if(!err)
            {
                res.status(RESPONSE_CODES.OK);
                res.json(result);
            }
            else
            {
                console.log(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
    else{
        mySqlDs.getServicePerformanceStats(config, reqId, function(err, result){
            if (!err) {
                res.status(RESPONSE_CODES.OK);
                res.json(result);
            }
            else
            {
                console.log(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
                returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, err);
            }
        });
    }
}

function returnError(res, statusCode, error)
{
    res.status(statusCode).send(error);
}
