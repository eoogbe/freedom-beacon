/*
 * the routes for the favorites resource.
 */

exports.post = function(request, response) {
    var mongoose,
        User;
    
    mongoose = require('mongoose');

    require('../models/User');
    User = mongoose.model('User');
    
    console.log('session: ' + request.session);
    
    User.findById(request.session.userId)
        .exec(afterQuery);
    
    function afterQuery(err, user) {
        user.favorites.push(request.body.friendId);
        user.save(function(){
            response.send(200);
        });
    }
};

exports.delete = function(request, response) {
    var mongoose,
        User;
    
    mongoose = require('mongoose');

    require('../models/User');
    User = mongoose.model('User');
    
    User.findById(request.session.userId)
        .exec(afterQuery);
    
    function afterQuery(err, user) {
        var index = user.favorites.indexOf(request.body.friendId);
        user.favorites.splice(index, 1);
        
        user.save(function(){
            response.send(200);
        });
    }
};
