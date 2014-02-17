/*
 * the routes for partials.
 */

exports.show = function(request, response) {
    var copy = require('../lib/copy').copy;
    var data = copy(request.query);
    data.layout = false;
    
    response.render('partials/' + request.params.id, data);
};
