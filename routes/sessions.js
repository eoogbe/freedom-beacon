/*
 * the routes for the sessions resource.
 */

exports.post = function(request, response) {
    var mongoose = require('mongoose');
    
    require('../models/User');
    var User = mongoose.model('User');
    
    User.find({'username': request.body.username})
        .exec(afterQuery);
    
    function setUserId(user) {
        request.session.userId = user._id;
        response.send(200);
    }
    
    function createUser() {
        var userData =
        {
            'username': request.body.username,
            'name': request.body.name,
            'friends': []
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
