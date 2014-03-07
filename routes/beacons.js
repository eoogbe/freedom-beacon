/*
 * the routes for the beacons resource.
 */
function getIlluminatedBeaconData(timeLeft) {
  return {
    'isDeactivated': false,
    'userTime': timeLeft,
    'timerValue': timeLeft + ':00'
  };
}

function getDeactivatedBeaconData() {
  return {
    'isDeactivated': true,
    'userTime': '30',
    'timerValue': '30'
  };
}

function getBeaconData(user) {
  var timeLeft
    , data;
  
  if (user) {
    timeLeft = user.getTimeLeft();
  
    data = timeLeft > 0
      ? getIlluminatedBeaconData(timeLeft)
      : getDeactivatedBeaconData();
  } else {
    data = getDeactivatedBeaconData();
    data.error = 'You have not logged in';
  }
  
  return data;
}

exports.create = function(request, response) {
  var mongoose
    , User;
  
  mongoose = require('mongoose');

  require('../models/User');
  User = mongoose.model('User');
  
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function afterQuery(err, user) {
    response.render('beacons-create', getBeaconData(user));
  }
};

exports.post = function(request, response) {
  var mongoose
    , User;
  
  mongoose = require('mongoose');

  require('../models/User');
  User = mongoose.model('User');
  
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function isIlluminatedBeacon(beacon) {
    return typeof beacon.duration === 'undefined';
  }
  
  function getOneMinuteAgo() {
    var MILLISECONDS_PER_MINUTE = 60000;
    return new Date(Date.now() - MILLISECONDS_PER_MINUTE);
  }
  
  // Can't put zero in duration because it won't validate
  function zeroDuration(beacon) {
    beacon.duration = 1;
    beacon.timeSet = getOneMinuteAgo();
  }
  
  function afterSave(err) {
    if (err) {
      var data =
      {
        'error': 'Enter a number between 1 and 60',
        'isDeactivated': true,
        'timerValue': ''
      };
      
      response.render('beacons-create', data);
    } else {
      response.redirect('/beacons/create');
    }
  }
  
  function afterQuery(err, user) {
    if (user) {
      user.beacon =
      {
        'duration': request.body['main-beacon'],
        'timeSet': new Date(Date.now())
      };
      
      if (isIlluminatedBeacon(user.beacon)) {
        zeroDuration(user.beacon);
      }
      
      user.markModified('beacon');
      user.save(afterSave);
    } else {
      response.redirect('/beacons/create');
    }
  }
};

exports.delete = function(request, response) {
  response.render('partials/main-beacon', {
    'layout': false,
    'timerValue': '0'
  });
};
