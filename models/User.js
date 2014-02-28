/*
 * the User model defintion.
 */

var MILLISECONDS_PER_MINUTE,
    mongoose,
    ObjectId,
    UserSchema;
    
MILLISECONDS_PER_MINUTE = 60000;

mongoose = require('mongoose');
ObjectId = mongoose.Schema.Types.ObjectId;

UserSchema = new mongoose.Schema({
    'name': String,
    'fbId': Number,
    'beacon': {'duration': Number, 'timeSet': Date},
    'favorites': [{'type': ObjectId, 'ref': 'User'}],
    'position': {'latitude': Number, 'longitude': Number},
    'fbFriends': [{'fbId': Number, 'username': String}],
    'threads': [
        {
            'id': Number,
            'participants': [{'id': Number}]
        }
    ]
});

function addMinutes(date, min) {
    return new Date(date.getTime() + min * MILLISECONDS_PER_MINUTE);
}

UserSchema.methods.isFree = function() {
    var end = addMinutes(this.beacon.timeSet, this.beacon.duration);
    return end.getTime() > Date.now();
};

UserSchema.methods.getTimeLeft = function() {
	var timeLeft = Date.now() - this.beacon.timeSet.getTime();
	return this.beacon.duration - Math.floor(timeLeft / MILLISECONDS_PER_MINUTE);
};

mongoose.model('User', UserSchema);
