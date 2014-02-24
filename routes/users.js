/*
 * the routes for the users resource.
 */

exports.index = function(request, response) {
    // hacky way of making sure people aren't just fiddling with the url
    if (request.query.requestor !== 'jquery') {
        response.redirect('/');
    }
    
    var copy = require('../lib/copy').copy;
    var mongoose = require('mongoose');

    require('../models/User');
    var User = mongoose.model('User');
    
    User.findById(request.session.userId)
        .exec(afterQuery);
    
    function getUser(data, favorites) {
        if (data.isFree()) {
            return {
                'userId': data._id,
                'name': data.name,
                'fbId': data.fbId,
                'distance': copy(data.distance),
                'time': data.getTimeLeft(),
                'isFree': true,
                'isFavorite': favorites.indexOf(data._id) != -1
            };
        } else {
            return {
                'userId': data._id,
                'name': data.name,
                'fbId': data.fbId,
                'isFree': false,
                'isFavorite': favorites.indexOf(data._id) != -1
            };
        }
    }
    
    function getUsersData(users, favorites) {
        var usersData = [];
        
        for (var i = 0; i < users.length; ++i) {
            var user = getUser(users[i], favorites);
            usersData.push(user);
        }
        
        return usersData;
    }
    
    function afterQuery(err, user) {
        User.find({}, function(err, users) {
            var usersData = getUsersData(users, user.favorites);
            response.json({'users': usersData});
        });
    }
};
