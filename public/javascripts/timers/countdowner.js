var FREE = FREE || {};

FREE.Countdowner = (function(){
    var DELAY,
        interval,
        $timer,
        done;
    
    DELAY = 60000;
    
    function init($t, d) {
        $timer = $t;
        done = d;
    }
    
    function tick() {
        var min = parseInt($timer.data('min'));
        
        if (min <= 0) {
            done();
        } else {
            --min;
            $timer.data('min', min);
            $timer.val(min);
        }
    };
    
    function countdown() {
        interval = new FREE.Interval(tick, DELAY);
        interval.start();
    };
    
    function stop() {
        interval.stop();
    }
    
    return {
        'init': init,
        'countdown': countdown,
        'stop': stop
    };
})();
