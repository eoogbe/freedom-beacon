/*
 * the routes for the friends resource.
 */

var mongoose = require('mongoose');

require('../models/User');
require('../models/Distance'); // needed for populate('distance') to work
var User = mongoose.model('User');

var SPECIAL_CHARS_REGEXP = /[\\\.\[\^\$\(\)\?\:\*\=\!\|\{\}\/\,]/g

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

    User.findById(request.session.userId).exec(function(err, user) {
          User.find({'name': new RegExp(searchEntry.replace(SPECIAL_CHARS_REGEXP, ''), 'i')}).populate('friendRequests')
      .exec(function (err, users) {
        var haveRequested = [];
        var haveNotRequested = [];
          for(var i = 0; i < users.length; ++i) {
            var searchResult = users[i];
            if(searchResult._id.equals(request.session.userId) || user.friends.indexOf(searchResult._id) != -1) {
              continue;
            }
            if(searchResult.friendRequests.indexOf(request.session.userId) == -1) {
               haveNotRequested.push(searchResult);
             }
            else {
               haveRequested.push(searchResult);
            }
         }

        renderResponse(haveRequested, haveNotRequested, true);
      });
    });

  } else {
    renderResponse([],[],false);
  }
  
  function renderResponse(haveRequested, haveNotRequested, hasSearched) {
    response.render('friends-search', {
      'haveRequested': haveRequested,
      'haveNotRequested': haveNotRequested,
      'hasSearched': hasSearched,
      'hasSearchResults': haveRequested.length + haveNotRequested.length > 0
    });
  }
  

};
