/*
 * the routes for the Facebook friends resource.
 */

exports.index = function(request, response) {
    if (request.query.format === 'html') {
        response.render('fbFriends-index', {
            'fbFriends': request.query.fbFriends,
            'layout': false
        });
    } else {
        response.redirect('/');
    }
};
