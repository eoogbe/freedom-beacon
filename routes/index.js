/*
 * GET home page.
 */

exports.index = function(req, res){
  var friends = [
    {
      'name': 'Carey Phelps',
      'time': 6
    },
    {
      'name': 'Kai Kuspa',
      'time': 21
    },
    {
      'name': 'Eva Ogbe',
      'time': 30
    },
    {
      'name': 'Jennifer',
      'time': 20
    },
    {
      'name': 'Nithya',
      'time': 6
    },
    {
      'name': 'Qudus',
      'time': 3
    },
    {
      'name': 'Andres',
      'time': 2
    },
    {
      'name': 'Jorge',
      'time': 10
    }
  ];
  
  res.render('index', {'friends': friends});
};