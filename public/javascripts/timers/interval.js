var FREE = FREE || {};

// Adapted from http://stackoverflow.com/a/2679208/830988
FREE.Interval = function(fn, delay) {
    var timerId = false;
    
    this.start = function () {
        if (!this.isRunning()) timerId = setInterval(fn, delay);
    };
    
    this.stop = function () {
        clearInterval(timerId);
        timerId = false;
    };
    
    this.isRunning = function () {
        return timerId !== false;
    };
};