var FREE = FREE || {};

FREE.DistanceFlyout = (function(){
    function addCloseHandler() {
		var closeButton = FREE.CloseButton;
		closeButton.init();
		closeButton.registerEventHandlers();
	}
	
	function distanceClicked(e) {
		$(this).siblings('.distance-flyout').show();
		addCloseHandler();
	}
    
    function registerEventHandlers() {
		$('.distance-link').click(distanceClicked);
    }
    
    return {
		'init': function(){},
		'registerEventHandlers': registerEventHandlers
	};
})();
