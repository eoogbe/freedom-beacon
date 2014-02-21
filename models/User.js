/*
 * the User model defintion.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
    'name': String,
    'username': String,
    'friends': [{'type': ObjectId, 'ref': 'User'}],
    'beacon': {'timeSet': Date, 'duration': Number},
    'distance': {'type': ObjectId, 'ref': 'Distance'},
    'friendRequests': [{'type': ObjectId, 'ref': 'User'}]
});

var MILLISECONDS_PER_MINUTE = 60000;

function addMinutes(date, min) {
    return new Date(date.getTime() + min * MILLISECONDS_PER_MINUTE);
}

UserSchema.methods.isFree = function() {
    var end = addMinutes(this.beacon.timeSet, this.beacon.duration);
    return end.getTime() > Date.now();
};

UserSchema.methods.getTimeLeft = function() {
	var timeLeft = Date.now() - this.beacon.timeSet.getTime();
	return this.beacon.duration - Math.ceil(timeLeft / MILLISECONDS_PER_MINUTE);
}

mongoose.model('User', UserSchema);
