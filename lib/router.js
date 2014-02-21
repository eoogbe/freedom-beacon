/*
 * lists all the routes. An example usage: If you wanted to add a route to
 * /freedom/:id that showed the freedom page, you would (1) create a freedom.js
 * file in the routes folder, (2) put exports.show = function(req, res) with a
 * function that renders the freedom view, (3) add
 * var freedom = require('../routes/freedom') and
 * app.get('/freedom/:id', freedom.show) to this file. See index for an
 * example. Note that index does not require '../routes/index' because index
 * is the default page in every folder.
 */

exports.route = function(app) {
    var Facebook = require('facebook-node-sdk');
    
    var homepage = require('../routes');
    var beacons = require('../routes/beacons');
    var friends = require('../routes/friends');
    var sessions = require('../routes/sessions');
    
    app.get('/', homepage.index);
    app.get('/beacons/create', Facebook.loginRequired(app.locals.fb), beacons.create);
    app.get('/friends/search', [Facebook.loginRequired(app.locals.fb), beacons.show], friends.search);
    app.get('/friends/create', [Facebook.loginRequired(app.locals.fb), beacons.show], friends.create);
    
    app.post('/sessions', sessions.post);
    app.post('/beacons', beacons.post);
}
