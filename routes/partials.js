/*
 * the routes for partials.
 */

exports.show = function(req, res) {
    var copy = require('../lib/copy').copy;
    var data = copy(req.query);
    data["layout"] = false;
    
    res.render('partials/' + req.params.id, data);
};
