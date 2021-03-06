/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');

var config = require('./lib/config');
var router = require('./lib/router');
var compressor = require('./lib/compressor');

var app = express();

config.config(app, express);
router.route(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

compressor.compress();
