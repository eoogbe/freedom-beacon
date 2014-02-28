/*
 * an object that holds distance information. Not a Mongoose model, but I
 * couldn't think of a good place to put it.
 */

var EARTH_RADIUS = 3961.0;

// Uses the Haversine Formula to calculate the distance between two
// coordinates. Taken from http://andrew.hedges.name/experiments/haversine/
exports.calculate = function(user1, user2){
    var lat1,
        lat2,
        lng1,
        lng2,
        dlng,
        dlat,
        a,
        c;
    
    lat1 = user1.position.latitude;
    lat2 = user2.position.latitude;
    lng1 = user1.position.longitude;
    lng2 = user2.position.longitude;
    
    dlng = lng2 - lng1;
    dlat = lat2 - lat1;
    
    a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return EARTH_RADIUS * c;
};

exports.types = [
    {
        'name': 'walking',
        'description': 'Walking distance is less than 1.0 miles away.'
    },
    {
        'name': 'biking',
        'description': 'Biking distance is between 3.0 and 1.0 miles away.'
    },
    {
        'name': 'driving',
        'description': 'Driving distance is between 25.0 and 3.0 miles away.'
    },
    {
        'name': 'calling',
        'description': 'Calling distance is greater than 25.0 miles away.'
    }
];
