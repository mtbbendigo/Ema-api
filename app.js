'use strict';

var a127 = require('a127-magic');
var express = require('express');
var uns = require("underscore");
var app = express();

module.exports = app; // for testing

// initialize a127 framework
a127.init(function(config) {

  // include a127 middleware
  app.use(a127.middleware(config));

  // error handler to emit errors as a json string
  app.use(function(err, req, res, next) {
    if (typeof err !== 'object') {
      // If the object is not an Error, create a representation that appears to be
      err = {
        message: String(err) // Coerce to string
      };
    } else {
      // Ensure that err.message is enumerable (It is not by default)

      Object.defineProperty(err, 'message', { enumerable: true });
    }

    var errorResponse = new Object();
    var list = Object.keys(err);
    for (var i=0; i < list.length; i++) {
      if (list[i] === 'originalResponse') {
        errorResponse = err.originalResponse;
      }
    }

    if(errorResponse != null){
      console.error(err);
      res.status(500).json(errorResponse);
    }
    else {
      console.error(err);
      res.status(500).json(err);
    }

  });

  var port = process.env.PORT || 10010;
  // begin listening for client requests
  app.listen(port);

  console.log('try this:\ncurl http://localhost:' + port + '/ema/env');
});
