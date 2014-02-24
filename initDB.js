
/*
  This script will initialize a local Mongo database
  on your machine so you can do development work.

  Adapted from the introHCI staff's lab7 initDB file.
*/

var mongoose = require('mongoose');

require('./models/User');
var User = mongoose.model('User');

// Connect to the Mongo database, whether locally or on Heroku
var local_database_name = 'free-test';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

User.find()
  .remove()
  .exec(function(){
    // The script won't terminate until the 
    // connection to the database is closed
    mongoose.connection.close();
  });
