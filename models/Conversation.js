var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ConversationSchema = new mongoose.Schema({
    'users': [{'type': ObjectId, 'ref': 'User'}],
    
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
        var sender = new ObjectId(userId) === this.messages[i].sender
            ? 'user' : 'friend';
        var message = { 'text': this.messages[i].text, 'sender': sender };
        
        messages.push(message);
    }
    
    return messages;
};

ConversationSchema.methods.getFriendId = function(userId) {
    return this.users;
    //return this.users[0] === new ObjectId(userId)
    //    ? this.users[1] : this.users[0];
};

var Conversation = mongoose.model('Conversation', ConversationSchema);
module.exports = Conversation;
