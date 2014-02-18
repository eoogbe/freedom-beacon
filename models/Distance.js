var mongoose = require('mongoose');

var DistanceSchema = new mongoose.Schema({
    'name': String,
    'description': String
});

mongoose.model('Distance', DistanceSchema);
