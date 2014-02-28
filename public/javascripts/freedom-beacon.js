'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	var mainBeacon,
		inviteLink;
	
	FREE.Facebook.init();
	
	mainBeacon = FREE.MainBeacon;
	mainBeacon.init();
	mainBeacon.run();
	
	inviteLink = FREE.InviteLink;
	inviteLink.init();
	inviteLink.registerEventHandlers();
}
