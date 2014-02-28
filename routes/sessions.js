/*
 * the routes for the sessions resource.
 */

exports.post = function(request, response) {
    var mongoose = require('mongoose');
    
    require('../models/User');
    var User = mongoose.model('User');
    
    User.find({'fbId': request.body.fbId})
        .exec(afterQuery);
    
    function setUserId(user) {
        request.session.userId = user._id;
        response.send(200);
    }
    
    function createUser() {
        var userData,
            coords;
        
        coords = request.body.coords;
        
        userData =
        {
            'fbId': request.body.fbId,
            'name': request.body.name,
            'beacon': {'duration': 0, 'timeSet': new Date()},
            'position':
            {
                'latitude': coords.latitude,
                'longitude': coords.longitude
            }
        };
        
        User.create(userData, function(err, user){
            setUserId(user);
        });
    }
    
    function afterQuery(err, users) {
        if (users.length > 0) {
            setUserId(users[0]);
        } else {
            createUser();
        }
    }
};

exports.show = function(request, response, next) {
    if (request.session.userId) {
        next();
    } else {
        response.redirect('/');
    }
};
