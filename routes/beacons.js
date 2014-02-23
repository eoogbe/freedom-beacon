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
      'timerValue': timeLeft + ':00',
      'timerClass': 'disabled-timer',
      'timerProp': 'disabled'
    };
  }
  
  function getDeactivatedBeaconData() {
    return {
      'beaconAction': 'illuminate',
      'userTime': '30',
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
    var data = getData(user);
    data.userFbId = user.fbId;
    
    response.render('beacons-create', data);
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

exports.delete = function(request, response) {
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function afterQuery(err, user) {
    user.beacon.duration = 0;
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
