/*
 * GET home page.
 */

var data = require('../data.json');

exports.index = function(req, res){
  res.render('index', data);
};
