/*
 * the routes for the beacons resource.
 */

exports.create = function(request, response) {  
  response.render('beacons-create', {
    'mainBeaconVisibility': 'invisible'
  });
};

exports.show = function(request, response, next) {
	// initialize
	var mongoose = requre('mongoose');
	require('../models/User');
	var User = mongoose.model('User');

	User.findById(request.session.userId).exec(afterQuery);

	function afterQuery(err, user) {
		response.locals.userTime = user.getTimeLeft();
		next();
	}
}