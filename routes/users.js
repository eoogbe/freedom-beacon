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
    require('../models/Distance');
    var User = mongoose.model('User');
    
    User.find({})
        .populate('distance')
        .exec(afterQuery);
    
    function getUser(data) {
        if (data.isFree()) {
            return {
                'name': data.name,
                'fbId': data.fbId,
                'distance': copy(data.distance),
                'time': data.timeLeft(),
                'isFree': true
            };
        } else {
            return {
                'name': data.name,
                'fbId': data.fbId,
                'isFree': false
            };
        }
    }
    
    function getUsersData(users) {
        var usersData = [];
        
        for (var i = 0; i < users.length; ++i) {
            var user = getUser(users[i]);
            usersData.push(user);
        }
        
        return usersData;
    }
    
    function afterQuery(err, users) {
        var usersData = getUsersData(users);
        response.json({'users': usersData});
    }
};
