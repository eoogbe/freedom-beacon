var FREE = FREE || {};

FREE.FriendsList = (function(){
	function closeClicked() {
		$(this).parent().hide();
	}
	
	function distanceClicked(e) {
		e.preventDefault();
		$(this).siblings('.distance-flyout').show();
	}
    
    function registerEventHandlers() {
		$('.distance-link').click(distanceClicked);
		$('button[name="close-btn"]').click(closeClicked);
    }
    
    return {
		'init': function(){},
		'registerEventHandlers': registerEventHandlers
	};
})();