var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ConversationSchema = new mongoose.Schema({
    'users': Object,
    'messages': [
        {
            'text': String,
            'sender': {'type': ObjectId, 'ref': 'User'}
        }
    ]
});

ConversationSchema.methods.findMessages = function(userId) {
    var messages = [];
    
    for (var i = 0; i < this.messages.length; ++i) {
        var sender = this.messages[i].sender.equals(userId) ? 'user' : 'friend';
        var message = { 'text': this.messages[i].text, 'sender': sender };
        
        messages.push(message);
    }
    
    return messages;
};

ConversationSchema.methods.getFriendId = function(userId) {
    for (var u in this.users) {
        if (u !== userId) return new mongoose.Types.ObjectId(u);
    }
    
    return null;
};

mongoose.model('Conversation', ConversationSchema);
