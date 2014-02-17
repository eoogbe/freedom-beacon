/*
 * the routes for the friends resource.
 */

var data = require('../data.json');
var PINGING_STATUS = 0;

exports.index = function(req, res) {
  var distances = data.distances;
  var statuses = data.statuses;
  
  var friends =
  {
    'pinging': [],
    'free': [],
    'offline': []
  };
  
  for (var i = 0; i < data.friends.length; ++i) {
    var friend = data.friends[i];
    
    friend.url = friend.statusId == PINGING_STATUS ? '/conversations/' + i : '#';
    friend.distance = distances[friend.distanceId];
    
    var status = statuses[friend.statusId];
    friend.status = status;
    
    friends[status].push(friend);
  }
  
  res.render('friends-index', {
    'friends': friends,
    'userTime': 30
  });
};

exports.search = function(req, res) {
  var searchResults = [];
  var searchEntry = req.query['friends-search'];
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
  
  res.render('friends-search', {
    'searchResults': searchResults,
    'hasSearched': hasSearched,
    'userTime': 30
  });
};
