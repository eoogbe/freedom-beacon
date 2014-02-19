var FREE = FREE || {};

FREE.HeaderTimer = (function(){
    var $timerBtn;
	
	function replaceWithButton() {
		FREE.HeaderBeacon.init();
	}
	
	function startCountdown() {
		var countdowner = FREE.Countdowner;
		countdowner.init();
		countdowner.countdown($timerBtn, replaceWithButton);
	}
	
	function setupTimer() {
		startCountdown();
		$timerBtn.click(timerClicked);
	}
	
	function hasTimerBtn() {
		return $('input[name="header-timer-btn"]').length > 0;
	}
	
	function createTimerBtnHtml(min) {
		return '<input type="button" class="btn btn-default" data-min="' + min
			+ '" data-sec="0" name="header-timer-btn" value="' + min + ':00">';
	}
	
	function timeInputed(e) {
		e.preventDefault();
		
		if (!hasTimerBtn()) {
			var min = $('input[name="header-timer"]').val();
			$(this).html(createTimerBtnHtml(min));
			$timerBtn = $('input[name="header-timer-btn"]');
			setupTimer();
		}
	}
	
	function timerClicked() {
		var min = $timerBtn.data('min');
		$(this).parent().html('<input type="number" name="header-timer" min="1" max="60" value="' + min + '" autofocus>');
		$('form[name="header-timer-form"]').submit(timeInputed);
	}
	
	function init() {
		$timerBtn = $('input[name="header-timer-btn"]');
	}
    
    function run(){
        setupTimer();
    };
    
    return {
		'init': init,
		'run': run
	};
})();
