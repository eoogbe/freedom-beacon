/*
 * the routes for the conversations resource.
 */

exports.show = function(request, res) {
    var data = require('../data.json');
    
    res.render('conversations-show', {
        'friend': data['friends'][request.params.id]
    });
};
