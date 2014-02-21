/*
 * the routes for the beacons resource.
 */

var mongoose = require('mongoose');

require('../models/User');
var User = mongoose.model('User');

exports.create = function(request, response) {
  var copy = require('../lib/copy').copy;
  
  User.findById(request.session.userId)
    .populate('friends')
    .populate('distance')
    .exec(afterQuery);
  
  function afterQuery(err, user) {
    var freeFriends = [];
    
    for (var i = 0; i < user.friends.length; ++i) {
      var friend = user.friends[i];
      
      if (friend.isFree()) {
        freeFriends.push(getFreeFriend(friend));
      }
    }
    
    response.render('beacons-create', {
      'mainBeaconVisibility': 'invisible',
      'freeFriends': freeFriends
    });
  }
  
  function getFreeFriend(friend) {
    return {
      'name': friend.name,
      'username': friend.username,
      'distance': copy(friend.distance),
      'time': friend.beacon.duration
    };
  }
};

exports.post = function(request, response) {
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function afterQuery(err, user) {
    user.beacon.timeSet = new Date(Date.now());
    user.beacon.duration = request.body.mainTimer;
    user.save(function(){
      response.redirect('back');
    });
  }
}
