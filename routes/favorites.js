/*
 * the routes for the favorites resource.
 */

exports.post = function(request, response) {
    var mongoose,
        User;
    
    mongoose = require('mongoose');

    require('../models/User');
    User = mongoose.model('User');
    
    User.findById(request.session.userId)
        .exec(afterQuery);
    
    function afterQuery(err, user) {
        user.favorites.push(request.body.friendId);
        user.save(function(){
            response.render('partials/favorite-button', {
                'layout': false,
                'isFavorite': true
            });
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
            response.render('partials/favorite-button', {
                'layout': false,
                'isFavorite': false
            });
        });
    }
};
