/*
 * the routes for the users resource.
 */

exports.index = function(request, response) {
    var copy,
        mongoose,
        User,
        Distance;
    
    // hacky way of making sure people aren't just fiddling with the url
    if (request.query.requestor !== 'jquery') {
        response.redirect('/');
    }
    
    copy = require('../lib/copy').copy;
    mongoose = require('mongoose');

    require('../models/User');
    User = mongoose.model('User');
    
    Distance = require('../models/Distance');
    
    User.findById(request.session.userId)
        .exec(afterQuery);
    
    function getDistanceType(distance) {
        if (distance < 1.0) {
            return 0;
        } else if (distance < 3.0) {
            return 1;
        } else if (distance < 25.0) {
            return 2;
        } else {
            return 3;
        }
    }
    
    function getDistance(user, curUser) {
        var distance = Distance.calculate(user, curUser);
        var typeIdx = getDistanceType(distance);
        
        return copy(Distance.types[typeIdx]);
    }
    
    function objectIdArrayContains(arr, id) {
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i].equals(id)) return true;
        }
        
        return false;
    }
    
    function getUser(data, curUser) {
        if (data.isFree()) {
            return {
                'userId': data._id,
                'name': data.name,
                'fbId': data.fbId,
                'distance': getDistance(data, curUser),
                'time': data.getTimeLeft(),
                'isFree': true,
                'isFavorite': objectIdArrayContains(curUser.favorites, data._id)
            };
        } else {
            return {
                'userId': data._id,
                'name': data.name,
                'fbId': data.fbId,
                'isFree': false,
                'isFavorite': objectIdArrayContains(curUser.favorites, data._id)
            };
        }
    }
    
    function getUsersData(users, curUser) {
        var usersData,
            user;
        
        usersData = [];
        
        for (var i = 0; i < users.length; ++i) {
            user = getUser(users[i], curUser);
            usersData.push(user);
        }
        
        return usersData;
    }
    
    function afterQuery(err, user) {
        User.find({}, function(err, users) {
            var usersData = getUsersData(users, user);
            response.json({'users': usersData});
        });
    }
};
