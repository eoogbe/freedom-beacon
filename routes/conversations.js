/*
 * the routes for the conversations resource.
 */

exports.show = function(request, response) {
    var Conversation = require('../models/Conversation');
    var User = require('../models/User');
    
    Conversation.findById(request.params.id, function(err, conversation){
        var messages = conversation.findMessages(request.session.userId);
        var friendId = conversation.getFriendId(request.session.userId);
        
        User.findById(friendId, function(err, user) {
            var friend = user.name;
            
            response.render('conversations-show', {
                'messages': messages,
                'friend' : friend
            });
        });
    });
};
