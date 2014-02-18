var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
    'name': String,
    'friends': [{'type': ObjectId, 'ref': 'User'}],
    'conversations': [{'type': ObjectId, 'ref': 'Conversation'}],
    'time': Number,
    'distance': {'type': ObjectId, 'ref': 'Distance'},
    'status': Number
});

UserSchema.methods.addConversation = function(conversationId) {
    this.conversations.push(conversationId);
    this.save();
};

mongoose.model('User', UserSchema);
