var FREE = FREE || {};

FREE.MainBeacon = (function(){
    function deleteBeacon() {
        $.post('/beacons/delete');
    }
    
    function run() {
        if ($('.deactivate').length > 0) {
            var countdowner = FREE.Countdowner;
            countdowner.init();
            countdowner.countdown($('input[name="main-timer"]'), deleteBeacon);
        }
    }
    
    return {
        'init': function(){},
        'run': run
    };
})();