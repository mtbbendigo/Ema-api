/**
 * Created by adm9360 on 27/11/2015.
 */

var mysql      = require('mysql');
var express   =    require("express");
var app       =    express();

module.exports = {
    getListFromStproc: getListFromStproc,
    getListFromQuery: getListFromQuery
}

var s = getEnvironments();

//var connection = mysql.createConnection({
//    region     : 'localhost',
//    user     : 'roo',
//    password : 'Iluv2java2',
//    database : 'ema'
//});

//var pool      =    mysql.createPool({
//    connectionLimit : 100, //important
//    region     : 'localhost',
//    user     : 'root',
//    password : 'Iluv2java2',
//    database : 'ema',
//    debug    :  false
//});

//pool.getConnection(function(error, connection){
//    if(!error)
//    {
//        console.log('Successful Connection');
//        connection.query('SELECT * from environment', function(err, rows, fields) {
//            if (!err)
//                console.log('The solution is: ', rows);
//            else
//                console.log('Error while performing Query.', err);
//            connection.release();
//        });
//    }
//    else
//    {
//        console.log('Failed to create Connection');
//        console.log("Code: " + error.code + "\nErrorno: " + error.errno + "\nSQLState: " + error.sqlState);
//    }
//});

//
//connection.connect(function(error){
//    if(!error)
//    {
//        console.log('Successful Connection');
//    }
//    else
//    {
//        console.log('Failed to create Connection');
//        console.log("Code: " + error.code + "\nErrorno: " + error.errno + "\nSQLState: " + error.sqlState);
//    }
//});

//connection.query('SELECT * from environment', function(err, rows, fields) {
//    if (!err)
//        console.log('The solution is: ', rows);
//    else
//        console.log('Error while performing Query.', err);
//});
//
//connection.end();

function getConfig(isPooledConnection)
{
    if(isPooledConnection)
    {
        var pool      =    mysql.createPool({
            connectionLimit : 100, //important
            host     : 'localhost',
            user     : 'root',
            password : 'Iluv2java2',
            database : 'ema',
            debug    :  false
        });
        return pool;
    }
    else
    {
        var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'roo',
        password : 'Iluv2java2',
        database : 'ema'
        });
        return connection;
    }

}

function createConnection()
{

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

function getEnvironments()
{
    var conn = createPooledConnection();
    console.log("Successfull");
    conn.query('SELECT * from environment', function(err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.', err);
    });
}


function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from environment",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

app.get("/",function(req,res){-
    handle_database(req,res);
});



app.listen(3000);

function getListFromStproc(procName, params)
{

}

function getListFromQuery(query, params)
{

}
