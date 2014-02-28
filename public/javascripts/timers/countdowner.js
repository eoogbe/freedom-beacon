var FREE = FREE || {};

FREE.Countdowner = (function(){
    var DELAY,
        DELAY_C,
        interval,
        $timer,
        done;
    
    DELAY = 1000;
    DELAY_C = DELAY * 60;
    
    function init($t, d) {
        $timer = $t;
        done = d;
    }
    
    function tick() {
        var min,
            sec;
        
        min = parseInt($timer.data('min'));
        sec = parseInt($timer.data('sec'));
        
        if (sec <= 0 && min <= 0) {
            done();
        } else {
            if (sec === 0) {
                --min;
                sec = 59;
            } else {
                --sec;
            }
            
            $timer.data('min', min);
            $timer.data('sec', sec);
            
            if (sec < 10) sec = '0' + sec;
            $timer.val(min + ':' + sec);
        }
    };
    
    function tickC() {
        var min = parseInt($timer.data('min'));
        
        if (min <= 0) {
            done();
        } else {
            --min;
            $timer.data('min', min);
            $timer.val(min);
        }
    }
    
    function countdownImpl(delay, tickFn) {
        interval = new FREE.Interval(tickFn, delay);
        interval.start();
    };
    
    function countdown() {
        countdownImpl(DELAY, tick);
    }
    
    function countdownC() {
        countdownImpl(DELAY_C, tickC);
    }
    
    function stop() {
        interval.stop();
    }
    
    return {
        'init': init,
        'countdown': countdown,
        'countdownC': countdownC,
        'stop': stop
    };
})();
