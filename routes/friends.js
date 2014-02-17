/*
 * the routes for the friends resource.
 */

var copy = require('../lib/copy').copy;

var PINGING_STATUS = 0;
var OFFLINE_STATUS = 2;

function getData() {
  var data = require('../data.json');
  return copy(data);
}

exports.index = function(request, response) {
  var data = getData();
  
  var distances = data.distances;
  var statuses = data.statuses;
  
  var friends =
  {
    'pinging': [],
    'free': [],
    'offline': []
  };
  
  for (var i = 0; i < data.friends.length; ++i) {
    var friend = copy(data.friends[i]);
    
    friend.url = friend.statusId == PINGING_STATUS ? '/conversations/' + i : '#';
    
    if (friend.statusId !== OFFLINE_STATUS) {
      friend.distance = copy(distances[friend.distanceId]);
      friend.distance.name += ' distance';
      
      friend.time += ' min left';
    }
    
    var status = statuses[friend.statusId];
    friend.status = status;
    
    friends[status].push(friend);
  }
  
  response.render('friends-index', {
    'friends': friends,
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
