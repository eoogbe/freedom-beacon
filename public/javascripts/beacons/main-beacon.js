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
    
    function illuminatedBeaconSubmitted(e) {
        var form = this;
        e.preventDefault();
        
        showFlash();
        
        $.getJSON('/beacons/show', function(data){
            var min,
                sec,
                timeSpent;
            
            if (!($.isEmptyObject(data))) {
                min = $('input[name="main-timer"]').data('min');
                sec = $('input[name="main-timer"]').data('sec');
                timeSpent = data.duration - min;
                if (sec > 0) --timeSpent;
                
                ga('send', 'timing', 'beacon', 'duration', timeSpent);
            }
            
            ga('send', 'event', 'beacon', 'deactivate');
            form.submit();
        });
    }
    
    function deactivatedBeaconSubmitted(e) {
        var form = this,
            timeSet;
        
        e.preventDefault();
        
        showFlash();
        
        timeSet = $('input[name="main-beacon"]').val();
        ga('send', 'event', 'beacon', 'illuminate');
        ga('send', 'timing', 'beacon', 'time set', timeSet);
        
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
            
            $('form[name="main-timer-form"]').submit(illuminatedBeaconSubmitted);
        } else {
            $('form[name="main-timer-form"]').submit(deactivatedBeaconSubmitted);
        }
    }
    
    return {
        'init': $.noop,
        'run': run
    };
})();
