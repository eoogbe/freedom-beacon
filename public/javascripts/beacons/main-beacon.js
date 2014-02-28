var FREE = FREE || {};

FREE.MainBeacon = (function(){
    function deleteBeacon() {
        $.get('/beacons/delete', function(data){
            $('form[name="main-timer-form"]').html(data);
        });
    }
    
    function beaconSubmitted(e) {
        var form = this;
        e.preventDefault();
        $('.flash').text('Loading data...');
        $('.flash').show();
        form.submit();
    }
    
    function run() {
        if ($('.deactivate').length > 0) {
            var countdowner = FREE.Countdowner;
            countdowner.init();
            countdowner.countdown($('input[name="main-timer"]'), deleteBeacon);
        } else {
            $('form[name="main-timer-form"]').submit(beaconSubmitted);
        }
    }
    
    return {
        'init': $.noop,
        'run': run
    };
})();