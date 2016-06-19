/**
 * Created by adm9360 on 17/11/2015.
 */
'use strict';

var util = require('util');
var dsConfig = require.main.require('./config/config.js');
var uns = require("underscore");
var datasource = require.main.require('./api/helpers/mssql-datasource.js');
var mySqlDs = require.main.require('./api/helpers/mysql-datasource.js');
const RESPONSE_CODES = {OK : 200, BAD_REQUEST : 400, UNAUTHORIZED : 401, FORBIDDEN : 403, NOT_FOUND : 404, TIME_OUT : 408, INTERNAL_SERVER_ERROR : 500};
const ERROR_MESSAGES = {BAD_REQUEST: "An Error Occurred.", UNAUTHORIZED: "Unauthorized Access Denied!", FORBIDDEN: "Permission Denied! Bugger off please.", NOT_FOUND: "Resource not found.", TIME_OUT: "The server timed out waiting for the request.", INTERNAL_SERVER_ERROR: "Internal Server Error"};


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
    var env = req.swagger.params.id.value.toUpperCase();
    var errMsg = {message: "Parameter " + env + " does not match any environments"};
    var invalidConfig = "Config could not be created";
    var dbConfig = undefined;
    if(isSQLServer) {
        dbConfig = dsConfig.HUBDatabase;
    }
    else {
        dbConfig = dsConfig.MYSQL;
    }

    var config = uns.findWhere(dbConfig, {id: id});
    if(!config){
        console.log(invalidConfig);
        returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.BAD_REQUEST);
        return;
    }

    if(isSQLServer) {
        //MSSQL Server
        datasource.searchHubLogs(config, req, function(err, result)
        {
            if(!err)
            {
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
    var id = req.swagger.params.id.value.toUpperCase();
    var invalidConfig = "DBConfig does not exist.";
    var dbConfig = undefined;
    if(isSQLServer) {
        dbConfig = dsConfig.EMADatabase;
    }
    else {
        dbConfig = dsConfig.MYSQL;
    }

    var config = uns.findWhere(dbConfig, {id: id});
    if(!config){
        console.log(invalidConfig);
        returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.BAD_REQUEST);
        return;
    }
    if(isSQLServer){
        datasource.getEnvironments(config, function(err, result){
            if(!err)
            {
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
    var id = req.swagger.params.id.value.toUpperCase();
    var errMsg = {message: "Parameter " + id + " does not match any environments"};
    var invalidConfig = "Config could not be created";
    var dbConfig = undefined;
    if(isSQLServer){
        dbConfig = dsConfig.EMADatabase;
    }
    else {
        dbConfig = dsConfig.MYSQL;
    }

    var config = uns.findWhere(dbConfig, {id: id});
    if(!config){
        console.log(invalidConfig);
        returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.BAD_REQUEST);
        return;
    }

    if(isSQLServer) {
        //MSSQL Server
        datasource.getHubConsumers(config, function(err, result)
        {
            if(!err)
            {
                res.status(RESPONSE_CODES.OK).send(json(result));
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
                res.status(RESPONSE_CODES.OK).send(json(result));
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
    var errMsg = {message: "Parameter " + env + " does not match any environments"};
    var invalidConfig = "Config could not be created";
    var dbConfig = undefined;
    if(isSQLServer){
        dbConfig = dsConfig.HUBDatabase;
    }
    else {
        dbConfig = dsConfig.MYSQL;
    }

    var config = uns.findWhere(dbConfig, {id: id});
    if(!config){
        console.log(invalidConfig);
        returnError(res, RESPONSE_CODES.INTERNAL_SERVER_ERROR, ERROR_MESSAGES.BAD_REQUEST);
        return;
    }

    //MSSQL Server
    if(isSQLServer){
        datasource.getServicePerformanceStats(config, reqId, function(err, result)
        {
            if(!err)
            {
                res.status(RESPONSE_CODES.OK).send(json(result));
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
                res.status(RESPONSE_CODES.OK).send(json(result));
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
