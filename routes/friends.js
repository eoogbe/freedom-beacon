/*
 * the routes for the friends resource.
 */

exports.index = function(request, response) {
  var data
    , copy;
  
  copy = require('../lib/copy').copy;
  
  if (!request.query.hasFriends) {
    response.redirect('/');
  } else {
    data = copy(request.query);
    data.layout = false;
    
    // hasFriends converted to a string in the query. The string 'false' is
    // always true (or truthy to be more accurate) so we need to convert back
    // to a Boolean
    data.hasFriends = data.hasFriends === 'true';
    
    response.render('friends-index', data); 
  }
};
