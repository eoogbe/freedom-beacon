/*
 * lists all the routes.
 *
 * An example usage:
 * If you wanted to add a route to /freedom/:id that showed the freedom page,
 * you would (1) create a freedom.js file in the routes folder, (2) put
 * exports.show = function(req, res) with a function that renders the freedom
 * view, (3) add var freedom = require('../routes/freedom') and
 * app.get('/freedom/:id', freedom.show) to this file. Note that index does not
 * require '../routes/index' because index is the default page in every folder.
 */

exports.route = function(app) {
    var homepage,
        beacons,
        friends,
        favorites,
        users,
        sessions,
        fbFriends,
        invites;
    
    homepage = require('../routes');
    beacons = require('../routes/beacons');
    friends = require('../routes/friends');
    favorites = require('../routes/favorites');
    users = require('../routes/users');
    sessions = require('../routes/sessions');
    fbFriends = require('../routes/fbFriends');
    invites = require('../routes/invites');
    
    app.get('/', homepage.index);
    app.get('/beacons/create', sessions.show, beacons.create);
    app.get('/friends', friends.index);
    app.get('/users', users.index);
    app.get('/fbFriends', fbFriends.index);
    app.get('/invites', invites.index);
    
    app.post('/favorites', favorites.post);
    app.post('/sessions', sessions.post);
    app.post('/beacons', beacons.post);
    
    // called from jQuery so can't use regular naming convention
    app.post('/favorites/delete', favorites.delete);
    app.get('/beacons/delete', beacons.delete);
};
