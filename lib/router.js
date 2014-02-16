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

exports.routes = function(app) {
    var homepage = require('../routes');
    var partials = require('../routes/partials');
    var beacons = require('../routes/beacons');
    var friends = require('../routes/friends');
    var conversations = require('../routes/conversations');
    
    app.get('/',homepage.index);
    app.get('/beacons/create', beacons.create);
    app.get('/partials/:id', partials.show);
    app.get('/friends', friends.index);
    app.get('/conversations/:id', conversations.show);
}
