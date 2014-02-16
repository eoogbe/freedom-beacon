
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var compressor = require('node-minify');

var config = require('./lib/config');
var router = require('./lib/router');

var app = express();

config.config(app, express);
router.routes(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

var scripts = [
  'public/javascripts/beacons/header-beacon.js',
  'public/javascripts/beacons/main-beacon.js',
  'public/javascripts/conversations/message-form.js',
  'public/javascripts/facebook/facebook.js',
  'public/javascripts/friends/friends-list.js',
  'public/javascripts/timers/countdowner.js',
  'public/javascripts/timers/header-timer.js',
  'public/javascripts/timers/interval.js',
  'public/javascripts/url/url.js',
  'public/javascripts/freedom-beacon.js'
]

new compressor.minify({
    type: 'uglifyjs',
    fileIn: scripts,
    fileOut: 'public/javascripts/freedom-beacon.min.js',
    callback: function(err, min){
        if (err) throw err;
    }
});
