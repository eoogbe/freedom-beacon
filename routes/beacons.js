/*
 * the routes for the beacons resource.
 */

var mongoose = require('mongoose');

require('../models/User');
var User = mongoose.model('User');

exports.create = function(request, response) {
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function afterQuery(err, user) {
    response.render('beacons-create', { 'userFbId': user.fbId });
  }
};

exports.post = function(request, response) {
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function afterQuery(err, user) {
    user.beacon.timeSet = new Date(Date.now());
    user.beacon.duration = request.body.mainTimer;
    user.save(function(){
      response.redirect('back');
    });
  }
};

exports.show = function(request, response, next) {
	User.findById(request.session.userId).exec(afterQuery);

	function afterQuery(err, user) {
		response.locals.userTime = user.getTimeLeft();
		next();
	}
};
