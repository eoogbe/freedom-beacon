var FREE = FREE || {};

FREE.CloseButton = (function(){
    function closeClicked() {
		$(this).parent().hide();
	}
	
    function registerEventHandlers() {
        $('.close-btn').click(closeClicked);
    }
    
    return {
        'init': $.noop,
        'registerEventHandlers': registerEventHandlers
    }
})();
