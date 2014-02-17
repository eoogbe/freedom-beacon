/*
 * copies a JSON object. Adapted from http://stackoverflow.com/a/728694/830988
 */

exports.copy = function(obj) {
    var copy = {};
    
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    
    return copy;
};
