/*
 * the routes for the conversations resource.
 */

var data = require('../data.json');

exports.show = function(req, res) {
    var friend = data['friends'][req.params.id];
    friend['id'] = req.params.id;
    
    res.render('conversation', {
        'friend': friend,
        'backLink': '/friends'
    });
};
