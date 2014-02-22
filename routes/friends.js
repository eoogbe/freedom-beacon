/*
 * the routes for the friends resource.
 */

exports.index = function(request, response) {
  if (!hasFriends()) {
    response.redirect('/');
  }
  
  var data =
  {
    'layout': false,
    'freeFriends': request.query.freeFriends,
    'offlineFriends': request.query.offlineFriends
  };
  
  response.render('friends-index', data);
  
  function hasFriends() {
    return typeof request.query.freeFriends !== 'undefined'
      && typeof request.query.offlineFriends !== 'undefined';
  }
};
