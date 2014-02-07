/*
 * the routes for partials.
 */

exports.show = function(req, res) {
    function copy(obj) {
        // Taken from http://stackoverflow.com/a/4591639/830988
        return JSON.parse(JSON.stringify(obj));
    }
    
    var data = copy(req.query);
    data["layout"] = false;
    
    res.render('partials/' + req.params.id, data);
};
