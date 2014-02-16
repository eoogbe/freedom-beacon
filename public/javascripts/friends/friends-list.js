var FREE = FREE || {};

FREE.FriendsList = (function(){
    function meetRequested(e) {
		e.preventDefault();
		
		var status = $(this).siblings(".status");
		status.text("pinged");
	}
	
	function closeClicked() {
		$(this).parent().hide();
	}
	
	function distanceClicked() {
		$(this).siblings('.distance-flyout').show();
	}
    
    function registerEventHandlers() {
        $('.free > a').click(meetRequested);
        $('.offline > a').click(meetRequested);
		
		$('button[name="distance-btn"]').click(distanceClicked);
		$('button[name="close"]').click(closeClicked);
    }
    
    return {
		'init': function(){},
		'registerEventHandlers': registerEventHandlers
	};
})();