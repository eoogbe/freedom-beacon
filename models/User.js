/*
 * the User model defintion.
 */

var MILLISECONDS_PER_MINUTE,
    mongoose,
    ObjectId,
    Mixed,
    UserSchema,
    validators;
    
MILLISECONDS_PER_MINUTE = 60000;

mongoose = require('mongoose');

Mixed = mongoose.Schema.Types.Mixed;
ObjectId = mongoose.Schema.Types.ObjectId;

function validateBeaconDuration(beacon) {
    return beacon.duration >= 1 && beacon.duration <= 60;
}

UserSchema = new mongoose.Schema({
    'name': String,
    'fbId': Number,
    'beacon': {'type': Mixed, 'validate': validateBeaconDuration},
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
