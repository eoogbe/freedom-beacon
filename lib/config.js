/*
 * app configuration.
 */

exports.config = function(app, express) {
    // all environments
    var path = require('path');
    var hbs = require('express3-handlebars');
    
    app.set('port', process.env.PORT || 3000);
    
    app.set('views', path.dirname(__dirname) + '/views');
    app.engine('handlebars', hbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
    
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.session({'secret': 'FREE)y969#5@g*_!3kz+aovqfv-jr18-ywczvzk(@ur_n^gw4smxvc'}));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static('./public'));
    
    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }
    
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/free-test');
    
    require('../models/Conversation');
    require('../models/Distance');
    require('../models/User');
};
