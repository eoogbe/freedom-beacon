/*
 * the User model defintion.
 */

var MILLISECONDS_PER_MINUTE = 60000;

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = new mongoose.Schema({
    'name': String,
    'fbId': Number,
    'beaconDuration': Number,
    'beaconTimeSet': Date,
    'favorites': [{'type': ObjectId, 'ref': 'User'}],
    'positionLat': Number,
    'positionLng': Number
});

function addMinutes(date, min) {
    return new Date(date.getTime() + min * MILLISECONDS_PER_MINUTE);
}

UserSchema.methods.isFree = function() {
    var end = addMinutes(this.beaconTimeSet, this.beaconDuration);
    return end.getTime() > Date.now();
};

UserSchema.methods.getTimeLeft = function() {
	var timeLeft = Date.now() - this.beaconTimeSet.getTime();
	return this.beaconDuration - Math.floor(timeLeft / MILLISECONDS_PER_MINUTE);
};

mongoose.model('User', UserSchema);
