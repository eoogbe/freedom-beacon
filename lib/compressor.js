exports.compress = function(){
    var compressor = require('node-minify');
    
    var scripts = [
        'public/javascripts/beacons/main-beacon.js',
        'public/javascripts/facebook/facebook.js',
        'public/javascripts/flyouts/distance-flyout.js',
        'public/javascripts/friends/friends-list.js',
        'public/javascripts/friends/friends-finder.js',
        'public/javascripts/friends/favorite-button.js',
        'public/javascripts/friends/message-button.js',
        'public/javascripts/friends/invite-link.js',
        'public/javascripts/session/login-button.js',
        'public/javascripts/session/logout-button.js',
        'public/javascripts/timers/countdowner.js',
        'public/javascripts/timers/interval.js',
        'public/javascripts/nav/url.js',
        'public/javascripts/flyouts/close-button.js',
        'public/javascripts/freedom-beacon.js'
    ];
    
    new compressor.minify({
        type: 'uglifyjs',
        fileIn: scripts,
        fileOut: 'public/javascripts/freedom-beacon.min.js',
        callback: function(err, min){
            if (err) throw err;
        }
    });
};
