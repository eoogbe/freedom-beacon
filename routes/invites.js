/*
 * the routes for the invites resource.
 */

exports.index = function(request, response) {
    response.render('invites-index', {'layout': false});
};
