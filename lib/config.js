/*
 * app configuration.
 */

exports.config = function(app, express) {
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', './views');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static('./public'));
    
    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }
};