/*
 * the routes for the Facebook friends resource.
 */

exports.index = function(request, response) {
    response.render('fbFriends-index', {
        'fbFriends': request.query.fbFriends,
        'layout': false
    });
};
