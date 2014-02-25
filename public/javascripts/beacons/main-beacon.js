var FREE = FREE || {};

FREE.MainBeacon = (function(){
    function deleteBeacon() {
        $.get('/beacons/create');
    }
    
    function run() {
        if ($('.deactivate').length > 0) {
            var countdowner = FREE.Countdowner;
            countdowner.init();
            countdowner.countdown($('input[name="main-timer"]'), deleteBeacon);
        }
    }
    
    return {
        'init': $.noop,
        'run': run
    };
})();