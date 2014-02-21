exports.compress = function(){
    var compressor = require('node-minify');
    
    var scripts = [
        'public/javascripts/beacons/header-beacon.js',
        'public/javascripts/beacons/main-beacon.js',
        'public/javascripts/facebook/facebook.js',
        'public/javascripts/friends/friends-list.js',
        'public/javascripts/friends/request-button.js',
        'public/javascripts/timers/countdowner.js',
        'public/javascripts/timers/header-timer.js',
        'public/javascripts/timers/interval.js',
        'public/javascripts/nav/back-button.js',
        'public/javascripts/nav/url.js',
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
