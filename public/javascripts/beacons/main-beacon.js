var FREE = FREE || {};

FREE.MainBeacon = (function(){
    function deleteBeacon() {
        $.get('/beacons/delete', function(data){
            $('form[name="main-timer-form"]').html(data);
        });
    }
    
    function run() {
        var countdowner;
        
        if ($('.deactivate').length > 0) {
            countdowner = FREE.Countdowner;
            countdowner.init($('input[name="main-timer"]'), deleteBeacon);
            countdowner.countdown();
        }
    }
    
    return {
        'init': $.noop,
        'run': run
    };
})();
