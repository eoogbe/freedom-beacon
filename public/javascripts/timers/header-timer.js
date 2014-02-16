var FREE = FREE || {};

FREE.HeaderTimer = (function(){
    var $timer
	  , $container;
    
    function hasTimer() {
		return !isNaN(parseInt($timer.val()));
	}
	
	function makeTimerInvisible() {
		$timer.css('visibility', 'hidden');
	}
	
	function replaceWithButton() {
		FREE.HeaderBeacon.init();
	}
	
	function init(timerElem) {
		$timer = timerElem;
		$container = $timer.parent();
	}
    
    function run(){
        if (hasTimer()) {
            var countdowner = FREE.Countdowner;
			countdowner.init();
			countdowner.countdown($timer, replaceWithButton);
        } else {
            makeTimerInvisible();
        }
    };
    
    return {
		'init': init,
		'run': run
	};
})();
