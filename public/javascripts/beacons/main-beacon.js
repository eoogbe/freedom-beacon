var FREE = FREE || {};

FREE.MainBeacon = (function(){
    function deleteBeacon() {
        $.get('/beacons/delete', function(data){
            $('form[name="main-timer-form"]').html(data);
        });
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