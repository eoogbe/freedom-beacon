'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#beacon").click(beaconClicked);
	$("a.thumbnail").click(friendClicked);
}

function beaconClicked(e) {
	function changeBeacon(beacon, beaconCmd, disabledProp, timeVal) {
		beacon.text(beaconCmd + " beacon");
		
		$("#user-time").prop("disabled", disabledProp);
		$("#user-time").val(timeVal);
	}
	
	if ($("#user-time").prop("disabled")) {
		changeBeacon($(this), "deactivate", null, 30);
	} else {
		changeBeacon($(this), "illuminate", true, 0);
	}
}

function friendClicked(e) {
  // Cancel the default action, which prevents the page from reloading
    e.preventDefault();

    // In an event listener, $(this) is the element that fired the event
    var friendInfo = $(this).text();
    var jumbotronHeader = $(".jumbotron h1");
    jumbotronHeader.text(friendInfo);
}
