/*
 * the routes for the beacons resource.
 */

var mongoose = require('mongoose');

require('../models/User');
var User = mongoose.model('User');

exports.create = function(request, response) {
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function getIlluminatedBeaconData(timeLeft) {
    return {
      'beaconAction': 'deactivate',
      'userTime': timeLeft,
      'timerType': 'text',
      'timerValue': timeLeft + ':00',
      'timerClass': 'disabled-timer',
      'timerProp': 'disabled'
    };
  }
  
  function getDeactivatedBeaconData() {
    return {
      'beaconAction': 'illuminate',
      'userTime': '30',
      'timerType': 'number',
      'timerValue': '30',
      'timerProp': 'autofocus'
    };
  }
  
  function getData(user) {
    var timeLeft = user.getTimeLeft();
    
    return timeLeft > 0
      ? getIlluminatedBeaconData(timeLeft)
      : getDeactivatedBeaconData();
  }
  
  function afterQuery(err, user) {
    response.render('beacons-create', getData(user));
  }
};

exports.post = function(request, response) {
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function afterQuery(err, user) {
    user.beaconTimeSet = new Date(Date.now());
    user.beaconDuration = request.body['main-timer'];
    
    user.save(function(){
      response.redirect('/beacons/create');
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
