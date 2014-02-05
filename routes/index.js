/*
 * GET home page.
 */

exports.index = function(req, res){
  var friends = [
    'Carey Phelps 6m left',
    'Kai Kuspa 21m left',
    'Eva Ogbe 30m left',
    'Jennifer 20m left',
    'Nithya 6m left',
    'Qudus 3m left',
    'Andres 2m left',
    'Jorge 10m left'
  ];
  
  res.render('index', {'friends': friends});
};