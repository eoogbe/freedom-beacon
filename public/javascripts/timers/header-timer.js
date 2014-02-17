var FREE = FREE || {};

FREE.HeaderTimer = (function(){
    var $timer
	  , $container;
    
    function hasTimer() {
		return !isNaN(parseInt($timer.data('min')));
	}
	
	function makeTimerInvisible() {
		$timer.css('visibility', 'hidden');
	}
	
	function replaceWithButton() {
		FREE.HeaderBeacon.init();
	}
	
	function timerClicked() {
		// TODO: fill-in
	}
	
	function init() {
		$timer = $('input[name="header-timer"]');
		$container = $timer.parent();
	}
    
    function run(){
        if (hasTimer()) {
            var countdowner = FREE.Countdowner;
			countdowner.init();
			countdowner.countdown($timer, replaceWithButton);
			
			$timer.click(timerClicked);
        } else {
            makeTimerInvisible();
        }
    };
    
    return {
		'init': init,
		'run': run
	};
})();
