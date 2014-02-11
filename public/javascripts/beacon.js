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
	
	$(".free > a").click(meetRequested);
	$(".offline > a").click(meetRequested);
	
	$(".stop-conn").click(stopConnection);
	$("#message-form").submit(messageWritten);
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

function meetRequested(e) {
	e.preventDefault();
	
	if (!$(this).next().is(":visible")) {
		$(this).find(".status").text("pending...");
		$(this).next().show();
	}
}

function stopConnection(e) {
	var flyout = $(this).parent();
	flyout.hide();
	
	var time = flyout.next().val();
	
	if (time) {
		flyout.prev().find(".status").text(time + " min left");
	} else {
		flyout.prev().find(".status").text("");
	}
	
	flyout.parent().on("click", "a", meetRequested);
}

function messageWritten(e) {
	e.preventDefault();
	
	function appendMessage(message, type) {
		$.get("/partials/conv-item", {
			"message": message,
			"type": type
		}, function(data){
			$("#messages-box").append(data);
		});
	}
	
	var usrMsg = $("input[name='message']").val();
	$("input[name='message']").val("");
	appendMessage(usrMsg, "user");
	
	setTimeout(appendMessage, 3000, "Friend's reply", "friend");
}
