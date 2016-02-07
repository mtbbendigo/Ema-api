/**
 * Created by holly on 26/01/2016.
 */

'use strict';

var util = require('util');
var dsConfig = require.main.require('./config/config.js');
var usHelper = require("underscore");
var datasource = require.main.require('./api/helpers/mssql-datasource.js');
var mysqlds = require.main.require('./api/helpers/mysql-datasource.js');
var EMA_DB = "EMA";

var isSQLServer = true;

module.exports = {
    getSlogans: getSlogans
};

function getSlogans(req, res)
{
    var dbConfig = undefined;
    if(isSQLServer) {
        //SQL Server
        dbConfig = dsConfig.EMADatabase;
        var config = usHelper.findWhere(dbConfig, {name: "EMA"});

        datasource.getSlogans(config, function(err, result){
            if(!err)
            {
                res.json(result);
            }
            else
            {
                console.log(err);
                res.json("An error occured getting Environments");
            }
        });
    }
    else {
        //MY SQL
        dbConfig = dsConfig.MYSQL;
        var config = usHelper.findWhere(dbConfig, {name: "MYSQL"});
        mysqlds.getSlogans(config, function(err, result){
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
