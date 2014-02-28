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
      'isDeactivated': false,
      'userTime': timeLeft
    };
  }
  
  function getDeactivatedBeaconData() {
    return {
      'isDeactivated': true,
      'timerValue': '30'
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
    user.beacon =
    {
      'duration': request.body['main-timer'],
      'timeSet': new Date(Date.now())
    };
    
    user.markModified('beacon');
    
    user.save(function(){
      response.redirect('/beacons/create');
    });
  }
};

exports.delete = function(request, response) {
  response.render('partials/main-beacon', {
    'layout': false,
    'timerValue': '0'
  });
};
