/*
 * the routes for the friends resource.
 */

var mongoose = require('mongoose');

require('../models/User');
require('../models/Distance'); // needed for populate('distance') to work
var User = mongoose.model('User');

var SPECIAL_CHARS_REGEXP = /[\\\.\[\^\$\(\)\?\:\*\=\!\|\{\}\/\,]/g

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
