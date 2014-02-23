/*
 * the routes for the favorites resource.
 */

var mongoose = require('mongoose');

require('../models/User');
var User = mongoose.model('User');

exports.post = function(request, response) {    
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
