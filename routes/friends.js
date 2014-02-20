/*
 * the routes for the friends resource.
 */

var mongoose = require('mongoose');

require('../models/User');
require('../models/Distance'); // needed for populate('distance') to work
var User = mongoose.model('User');

var SPECIAL_CHARS_REGEXP = /[\\\.\[\^\$\(\)\?\:\*\=\!\|\{\}\/\,]/g

exports.index = function(request, response) {
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
    
    response.render('friends-index', {
      'freeFriends': freeFriends,
      'userTime': 30
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
