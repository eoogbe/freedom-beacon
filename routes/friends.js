/*
 * the routes for the friends resource.
 */

exports.index = function(request, response) {
  var data
    , copy;
  
  copy = require('../lib/copy').copy;
  
  if (typeof request.query.hasFriends === 'undefined') {
    response.redirect('/');
  } else {
    data = copy(request.query);
    data.layout = false;
    
    response.render('friends-index', data); 
  }
};
