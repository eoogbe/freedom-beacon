/*
 * the routes for the Facebook friends resource.
 */

exports.index = function(request, response) {
    var mongoose,
        User;
    
    mongoose = require('mongoose');
    
    require('../models/User');
    User = mongoose.model('User');
    
    if (request.query.format === 'json') {
        User.findById(request.session.userId)
            .exec(afterQuery);
    } else if (request.query.format === 'html') {
        response.render('fbFriends-index', {
            'fbFriends': request.query.fbFriends,
            'layout': false
        });
    } else {
        response.redirect('/');
    }
    
    function afterQuery(err, user) {
        var data;
        
        if (user.fbFriends && user.threads) {
            data = {
                'fbFriends': user.fbFriends,
                'threads': user.threads
            };
        } else {
            data = {};
        }
        
        response.json(data);
    }
};

exports.post = function(request, response) {
    var mongoose,
        User;
    
    mongoose = require('mongoose');
    
    require('../models/User');
    User = mongoose.model('User');
    
    User.findById(request.session.userId)
        .exec(afterQuery);
    
    function afterQuery(err, user) {
        user.fbFriends = request.body.fbFriends;
        user.threads = request.body.threads;
        
        user.markModified('fbFriends');
        user.markModified('threads');
        
        user.save(function(){
            response.send(200);
        });
    }
};
