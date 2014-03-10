/*
 * app configuration.
 */

exports.config = function(app, express) {
    var path,
        hbs,
        faviconPath,
        mongoose,
        db_uri;
    
    // all environments
    path = require('path');
    hbs = require('express3-handlebars');
    
    app.set('port', process.env.PORT || 3000);
    
    app.set('views', path.dirname(__dirname) + '/views');
    app.engine('handlebars', hbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    
    app.locals.fb =
    {
        'appId': process.env.FACEBOOK_APP_ID,
        'secret': process.env.FACEBOOK_APP_SECRET
    };
    
    app.use(express.favicon(path.dirname(__dirname) + '/public/images/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.session({'secret': process.env.FREE_SESSION_SECRET}));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static('./public'));
    
    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler()); 
    }
    
    mongoose = require('mongoose');
    db_uri = process.env.MONGOLAB_URI || 'mongodb://localhost/free-test';
    mongoose.connect(db_uri);
};
