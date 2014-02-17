var mongoose = require('mongoose');

var DistanceSchema = new mongoose.Schema({
    'name': String,
    'description': String
});

var Distance = mongoose.model('Distance', DistanceSchema);
module.exports = Distance;
