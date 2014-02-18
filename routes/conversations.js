/*
 * the routes for the conversations resource.
 */

exports.show = function(request, response) {
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Types.ObjectId;
    var Conversation = mongoose.model('Conversation');
    var User = mongoose.model('User');
    
    function createNewConversation(request, response) {
        var userId = request.session.userId;
        var friendId = request.query.friendId;
        
        var users = {};
        users[userId] = true;
        users[friendId] = true;
        
        Conversation.create({'users': users, 'messages': []}, function(err, conversation){
            User.findById(userId, function(err, user){
                user.conversations.push(conversation.id);
                user.save();
                
                User.findById(friendId, function(err, friend){
                    friend.conversations.push(conversation.id);
                    friend.save();
                    
                    response.render('conversations-show', {
                        'messages': [],
                        'friend' : friend.name
                    });
                });
            });
        });
    }
    
    function loadOldMessages(request, response) {
        Conversation.findById(request.params.id, function(err, conversation){
            var messages = conversation.findMessages(request.session.userId);
            var friendId = conversation.getFriendId(request.session.userId);
            
            User.findById(friendId, function(err, user) {
                response.render('conversations-show', {
                    'messages': messages,
                    'friend' : user.name
                });
            });
        });
    }
    
    if (request.params.id === 'new') {
        createNewConversation(request, response);
    } else {
        loadOldMessages(request, response);
    }
};
