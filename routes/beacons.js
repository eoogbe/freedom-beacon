/*
 * the routes for the beacons resource.
 */

exports.create = function(request, response) {  
  response.render('beacons-create', {
    'mainBeaconVisibility': 'invisible'
  });
};
