/*
 * app configuration.
 */

exports.config = function(app, express) {
    // all environments
    var path = require('path');
    var hbs = require('express3-handlebars');
    var Facebook = require('facebook-node-sdk');
    
    app.set('port', process.env.PORT || 3000);
    
    app.set('views', path.dirname(__dirname) + '/views');
    app.engine('handlebars', hbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    
    app.locals.fb =
    {
        'appId': process.env.FACEBOOK_APP_ID,
        'secret': process.env.FACEBOOK_APP_SECRET
    };
    
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.session({'secret': process.env.FREE_SESSION_SECRET}));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static('./public'));
    app.use(Facebook.middleware(app.locals.fb));
    
    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler()); 
    }
    
    var mongoose = require('mongoose');
    var db_uri = process.env.MONGOLAB_URI || 'mongodb://localhost/free-test';
    mongoose.connect(db_uri);
};
