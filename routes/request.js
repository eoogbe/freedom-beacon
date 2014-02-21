/*
* The routes for the request resource.
*/

var mongoose = require('mongoose');

require('../models/User');
var User = mongoose.model('User');

exports.post = function(request, response) {
	User.findById(request.body.thisFriend)
		.exec(afterQuery);

	function afterQuery(err, user) {
		user.friendRequests.push(request.session.userId);
		response.send(200);
	}
};