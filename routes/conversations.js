/*
 * the routes for the conversations resource.
 */

var data = require('../data.json');

exports.show = function(req, res) {
    res.render('conversations-show', {
        'friend': data['friends'][req.params.id]
    });
};
