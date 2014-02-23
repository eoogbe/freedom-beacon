/*
 * the routes for the friends resource.
 */

exports.index = function(request, response) {
  if (!hasFriendsData()) {
    response.redirect('/');
  } else {
    var hasFriends = request.query.freeFriends.length > 0
      || request.query.offlineFriends.length > 0;
    
    var data =
    {
      'layout': false,
      'freeFriends': request.query.freeFriends,
      'offlineFriends': request.query.offlineFriends,
      'hasFriends': hasFriends
    };
    
    response.render('friends-index', data); 
  }
  
  function hasFriendsData() {
    return typeof request.query.freeFriends !== 'undefined'
      && typeof request.query.offlineFriends !== 'undefined';
  }
};
