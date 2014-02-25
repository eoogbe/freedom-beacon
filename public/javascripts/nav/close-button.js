var FREE = FREE || {};

FREE.CloseButton = (function(){
    function closeClicked() {
		$(this).parents('.flyout').hide();
	}
	
    function registerEventHandlers() {
        $('.close-btn').click(closeClicked);
    }
    
    return {
        'init': $.noop,
        'registerEventHandlers': registerEventHandlers
    }
})();
