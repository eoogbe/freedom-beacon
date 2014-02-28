var FREE = FREE || {};

FREE.MainBeacon = (function(){
    function deleteBeacon() {
        $.get('/beacons/delete', function(data){
            $('form[name="main-timer-form"]').html(data);
        });
    }
    
    function showFlash() {
        $('.flash').text('Loading data...');
        $('.flash').show();
    }
    
    function beaconSubmitted(e) {
        var form = this;
        e.preventDefault();
        
        showFlash();
        ga('send', 'event', 'beacon', 'illuminate');
        
        form.submit();
    }
    
    function run() {
        var countdowner;
        
        if ($('.deactivate').length > 0) {
            countdowner = FREE.Countdowner;
            countdowner.init($('input[name="main-timer"]'), deleteBeacon);
            
            if ($('.alt-c').length === 0) {
                countdowner.countdown();
            } else {
                countdowner.countdownC();
            }
        } else {
            $('form[name="main-timer-form"]').submit(beaconSubmitted);
        }
    }
    
    return {
        'init': $.noop,
        'run': run
    };
})();