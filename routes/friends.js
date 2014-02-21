/*
 * the routes for the friends resource.
 */

var mongoose = require('mongoose');

require('../models/User');
require('../models/Distance'); // needed for populate('distance') to work
var User = mongoose.model('User');

var SPECIAL_CHARS_REGEXP = /[\\\.\[\^\$\(\)\?\:\*\=\!\|\{\}\/\,]/g


// Add Friend Button
exports.post = function(request, response) {
  var currentUserId = request.session.userId;
  var friendId = request.body.thisFriend;

  // Update Friend's Friend Property with current user id
  User.findById(friendId)
    .exec(afterQuery1);

  function afterQuery1(err, friend) {
    // update friends property with current user's id
    friend.friends.push(currentUserId);
    response.send(200);
  }

  // Update Curent User's Friend Property with friend's id
  User.findById(currentUserId)
    .exec(afterQuery2);

  function afterQuery2(err, user) {
    // update friends property with friend's id
    user.friends.push(friendId);
    // remove from requests property
    user.friendRequests.remove(friendId);
    response.send(200);
  }
};

exports.create = function(request, response) {
  var copy = require('../lib/copy').copy;
  
  User.findById(request.session.userId)
    .populate('friendRequests')
    .exec(afterQuery);

  function afterQuery(err, user) {
    var friendRequests = [];

    if(user){
      for (var i = 0; i < user.friendRequests.length; ++i) {
        var potentialFriend = user.friendRequests[i];
        friendRequests.push(getFriendRequest(potentialFriend));
      }
    }
      

    response.render('friends-create', {
      'friendRequests': friendRequests,
    });
  }

  function getFriendRequest(potentialFriend) {
    return {
      'name': friend.name,
      'id': friend._id  
    }
  }

  /*function acceptRequest(user, potentialFriend) {
    user.friends.push(potentialFriend);
    user.save();
  }*/
}

exports.search = function(request, response) {
  var searchEntry = request.query['friends-search'];
  
  if (typeof searchEntry !== 'undefined') {
    User.find({'name': new RegExp(searchEntry.replace(SPECIAL_CHARS_REGEXP, ''), 'i')})
      .exec(afterQuery);
  } else {
    renderResponse([], false);
  }
  
  function renderResponse(searchResults, hasSearched) {
    response.render('friends-search', {
      'searchResults': searchResults,
      'hasSearched': hasSearched,
      'userTime': 30
    });
  }
  
  function afterQuery(err, users) {
    renderResponse(users, true);
  }
};
