/*
 * the routes for the beacons resource.
 */

var copy = require('../lib/copy').copy;
var PINGING_STATUS = 0;

function getData() {
  var data = require('../data.json');
  return copy(data);
}

exports.create = function(request, response) {
  var data = getData();
  
  var distances = data.distances;
  var pingingFriends = [];
  
  for (var i = 0; i < data.friends.length; ++i) {
    var friend = copy(data.friends[i]);
    if (friend.statusId != PINGING_STATUS) continue;
    
    friend.url = '/conversations/' + i;
    friend.time += ' min left';
    
    friend.distance = copy(distances[friend.distanceId]);
    friend.distance.name += ' distance';
    
    pingingFriends.push(friend);
  }
  
  response.render('beacons-create', {
    'pingingFriends': pingingFriends,
    'mainBeaconVisibility': 'invisible'
  });
};
