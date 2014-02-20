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
    'distance': {'type': ObjectId, 'ref': 'Distance'}
});

mongoose.model('User', UserSchema);
