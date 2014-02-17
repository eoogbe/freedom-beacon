var FREE = FREE || {};

FREE.FriendsList = (function(){
    function meetRequested(e) {
		e.preventDefault();
		
		var status = $(this).parent().parent().find(".status");
		status.text("pinged");
	}
	
	function closeClicked() {
		$(this).parent().hide();
	}
	
	function distanceClicked() {
		$(this).siblings('.distance-flyout').show();
	}
    
    function registerEventHandlers() {
        $('.free > td > a').click(meetRequested);
        $('.offline > td > a').click(meetRequested);
		
		$('button[name="distance-btn"]').click(distanceClicked);
		$('button[name="close-btn"]').click(closeClicked);
    }
    
    return {
		'init': function(){},
		'registerEventHandlers': registerEventHandlers
	};
})();