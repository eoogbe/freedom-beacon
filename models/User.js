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

var MINUTES_PER_MILLISECOND = 60000;

function addMinutes(date, min) {
    return new Date(date.getTime() + min * MINUTES_PER_MILLISECOND);
}

UserSchema.methods.isFree = function() {
    var end = addMinutes(this.beacon.timeSet, this.beacon.duration);
    return end.getTime() > Date.now();
};

mongoose.model('User', UserSchema);
