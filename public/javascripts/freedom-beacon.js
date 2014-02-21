'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	(function() {
		var facebook = FREE.Facebook.init();
	})();
	
	(function() {
		var backButton = FREE.BackButton;
		backButton.init();
		backButton.registerEventHandlers();
	})();
	
	(function() {
		var headerTimer = FREE.HeaderTimer;
		headerTimer.init();
		headerTimer.run();
	})();
	
	(function() {
		var mainBeacon = FREE.MainBeacon;
		mainBeacon.init();
		mainBeacon.registerEventHandlers();
	})();
	
	(function() {
		var friendsList = FREE.FriendsList;
		friendsList.init();
		friendsList.registerEventHandlers();
	})();
	
	(function() {
		var requestButton = FREE.RequestButton;
		requestButton.init();
		requestButton.registerEventHandlers();
	})();
}
