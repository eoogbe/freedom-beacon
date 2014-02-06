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
	$("#flock > .free > a").click(freeClicked);
	$("#flock > .unfree > a").click(meetRequested);
	$(".undo").click(undo);
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

function freeClicked(e) {
	e.preventDefault();	
	$(this).next().toggle();
}

function meetRequested(e) {
	e.preventDefault();
	$(this).next().toggle();
}

function undo(e) {
	e.preventDefault();
	$(this).parent().hide();
}
