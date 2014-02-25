var FREE = FREE || {};

FREE.Countdowner = (function(){
    var DELAY = 1000;
    var interval;
    
    function tick($timer, done) {
        var min = parseInt($timer.data('min'));
        var sec = parseInt($timer.data('sec'));
        
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
    
    function countdown($timer, done) {
        interval = new FREE.Interval(function(){
            tick($timer, done);
        }, DELAY);
        
        interval.start();
    };
    
    function stop() {
        interval.stop();
    }
    
    return {
        'init': $.noop,
        'countdown': countdown,
        'stop': stop
    };
})();
