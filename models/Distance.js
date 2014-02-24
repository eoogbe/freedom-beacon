/*
 * an object that holds distance information. Not a Mongoose model, but I
 * couldn't think of a good place to put it.
 */

var EARTH_RADIUS = 3961;

module.exports = {
    'types': [
        {
            'name': 'shouting',
            'description': 'Shouting distance is less than 0.1 miles away'
        },
        {
            'name': 'walking',
            'description': 'Walking distance is between 1.0 and 0.1 miles away.'
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
    ],
    
    // Uses the Haversine Formula to calculate the distance between two
    // coordinates. Taken from http://andrew.hedges.name/experiments/haversine/
    'calculate': function(user1, user2) {
        var lat1,
            lat2,
            lng1,
            lng2,
            dlng,
            dlat,
            a,
            c;
        
        lat1 = user1.positionLat;
        lat2 = user2.positionLat;
        lng1 = user1.positionLng;
        lng2 = user2.positionLng;
        
        dlng = lng2 - lng1;
        dlat = lat2 - lat1;
        // 2 * atan2( sqrt(a), sqrt(1-a) ) 
        a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2);
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADUIS * c;
    }
};
