'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	function initFacebook() {
		var facebook = FREE.Facebook;
		
		window.fbAsyncInit = function() {
			facebook.init(FB);
			facebook.registerEventHandlers();
		}
		
		facebook.initFacebook();
	}
	
	function initHeaderTimer() {
		var headerTimer = FREE.HeaderTimer;
		headerTimer.init($('input[name="header-timer"'));
		headerTimer.run();
	}
	
	function initMainBeacon() {
		var mainBeacon = FREE.MainBeacon;
		mainBeacon.init();
		mainBeacon.registerEventHandlers();
	}
	
	function initFriendsList() {
		var friendsList = FREE.FriendsList;
		friendsList.init();
		friendsList.registerEventHandlers();
	}
	
	function initMessagesForm() {
		var messagesForm = FREE.MessagesForm;
		messagesForm.init();
		messagesForm.registerEventHandlers();
	}
	
	initFacebook();
	initHeaderTimer();
	initMainBeacon();
	initFriendsList();
	initMessagesForm();
}
