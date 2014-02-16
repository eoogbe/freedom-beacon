var FREE = FREE || {};

FREE.Countdowner = (function(){
    var DELAY = 60000;
    var interval;
    
    function tick($timer, done) {
        var min = parseInt($timer.val());
        
        if (min > 0) {
            $timer.val(min - 1);
        } else if (min === 0) {
            done();
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
        'init': function(){},
        'countdown': countdown,
        'stop': stop
    };
})();
