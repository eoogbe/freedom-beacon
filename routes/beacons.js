/*
 * the routes for the beacons resource.
 */

var data = require('../data.json');
var PINGING_STATUS = 0;

exports.create = function(req, res) {
  var distances = data.distances;
  var pingingFriends = [];
  
  for (var i = 0; i < data.friends.length; ++i) {
    var friend = data.friends[i];
    if (friend.statusId != PINGING_STATUS) continue;
    
    friend.url = '/conversations/' + i;
    friend.distance = distances[friend.distanceId];
    
    pingingFriends.push(friend);
  }
  
  res.render('beacons-create', {
    'pingingFriends': pingingFriends,
    'isFirst': 'isFirst'
  });
};
