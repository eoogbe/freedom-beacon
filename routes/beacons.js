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
    'timerValue': '30'
  };
}

function getBeaconData(user) {
  var timeLeft = user.getTimeLeft();
  
  return timeLeft > 0
    ? getIlluminatedBeaconData(timeLeft)
    : getDeactivatedBeaconData();
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

exports.createB = function(request, response) {
  var mongoose
    , User;
  
  mongoose = require('mongoose');

  require('../models/User');
  User = mongoose.model('User');
  
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function afterQuery(err, user) {
    var data = getBeaconData(user);
    data.isB = true;
    response.render('beacons-create', data);
  }
};

exports.createC = function(request, response) {
  var mongoose
    , User;
  
  mongoose = require('mongoose');

  require('../models/User');
  User = mongoose.model('User');
  
  User.findById(request.session.userId)
    .exec(afterQuery);
  
  function afterQuery(err, user) {
    var data = getBeaconData(user);
    data.altC = 'alt-c';
    data.timerValue = data.userTime;
    
    response.render('beacons-create', data);
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
  
  function afterQuery(err, user) {
    user.beacon =
    {
      'duration': request.body['main-timer'],
      'timeSet': new Date(Date.now())
    };
    
    user.markModified('beacon');
    
    user.save(function(err){
      var data;
      
      if (err) {
        data = getDeactivatedBeaconData();
        data.error = 'Set a time between 1 and 60 minutes';
        
        response.render('beacons-create', data);
      } else {
        response.redirect('/beacons/create');
      }
    });
  }
};

exports.delete = function(request, response) {
  response.render('partials/main-beacon', {
    'layout': false,
    'timerValue': '0'
  });
};
