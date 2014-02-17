var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var Status = require('./Status');

var UserSchema = new mongoose.Schema({
    'name': String,
    'conversations': [{'type': ObjectId, 'ref': 'Conversation'}],
    'friends': [{'type': ObjectId, 'ref': 'User'}],
    'time': Number,
    'distance': {'type': ObjectId, 'ref': 'Distance'},
    'status': Number
});

UserSchema.methods.findFriends = function() {
    var friends =
    {
      'pinging': [],
      'free': [],
      'offline': []
    };
    
    for (var i = 0; i < this.friends.length; ++i) {
        var status = Status[this.friends[i].status];
        friends[status] = this.friends[i];
    }
    
    return friends;
}

var User = mongoose.model('User', UserSchema);
module.exports = User;
