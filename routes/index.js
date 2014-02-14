/*
 * GET home page.
 */

var data = require('../data.json');
var PINGING_STATUS = 0;

exports.index = function(req, res) {
  var distances = data['distances'];
  var pingingFriends = [];
  
  for (var i = 0; i < data['friends'].length; ++i) {
    var friend = data['friends'][i];
    if (friend['status-id'] != PINGING_STATUS) continue;
    
    friend['id'] = i;
    friend['distance'] = distances[friend['distance-id']];
    
    pingingFriends.push(friend);
  }
  
  res.render('index', {
    'pingingFriends': pingingFriends,
    'backLink': '/login'
  });
};
