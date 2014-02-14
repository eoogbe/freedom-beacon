/*
 * GET home page.
 */

var data = require('../data.json');

exports.index = function(req, res) {
  var distances = data['distances'];
  var statuses = data['statuses'];
  
  var friends =
  {
    'pinging': [],
    'free': [],
    'offline': []
  };
  
  for (var i = 0; i < data['friends'].length; ++i) {
    var friend = data['friends'][i];
    friend['distance'] = distances[friend['distance-id']];
    
    var status = statuses[friend['status-id']];
    friends[status].push(friend);
  }
  
  res.render('index', {'friends': friends});
};
