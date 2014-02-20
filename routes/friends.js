/*
 * the routes for the friends resource.
 */

var copy = require('../lib/copy').copy;

function getData() {
  var data = require('../data.json');
  return copy(data);
}

exports.index = function(request, response) {
  var data = getData();
  var distances = data.distances;
  var freeFriends = [];
  
  for (var i = 0; i < data.friends.length; ++i) {
    var friend = copy(data.friends[i]);
    friend.distance = copy(distances[friend.distanceId]);
    freeFriends.push(friend);
  }
  
  response.render('friends-index', {
    'freeFriends': freeFriends,
    'userTime': 30
  });
};

exports.search = function(request, response) {
  var data = getData();
  var searchResults = [];
  var searchEntry = request.query['friends-search'];
  var hasSearched = false;
  
  if (typeof searchEntry !== 'undefined') {
    hasSearched = true;
    for (var i=0; i<data.friends.length; ++i) {
      var friendName = data.friends[i].name;
      if (friendName === searchEntry) {
        searchResults.push(friendName);
      }
    }
  }
  
  response.render('friends-search', {
    'searchResults': searchResults,
    'hasSearched': hasSearched,
    'userTime': 30
  });
};
