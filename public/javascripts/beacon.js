'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	function hasUserTime() {
		return !isNaN(parseInt($('.user-time > input').val()));
	}
	
	function makeUserTimeInvisible() {
		$('.user-time > input').css('border', '1px solid #fff');
	}
	
	function headerBeaconClicked(e) {
		$('.user-time').html('<input type="number" max="60" min="1" value="30" name="user-time" class="group-end" autofocus>');
	}
	
	var beaconTimerId = null;
	
	function beaconClicked(e) {
		if ($('#beacon').is(':checked')) {
			$('.beacon-btn').text('deactivate beacon');
			
			beaconTimerId = countdown($('.user-time-label > input'), function(){
				$('.beacon-btn').text('illuminate beacon');
			});
		} else {
			$('.beacon-btn').text('illuminate beacon');
			clearInterval(beaconTimerId);
		}
	}
	
	function meetRequested(e) {
		e.preventDefault();
		
		var status = $(this).find(".status");
		status.text("pinged");
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
	
	function countdown(userTimeElem, zeroedFunc) {
		console.log(userTimeElem);
		return setInterval(function(){
			var min = userTimeElem.val();
			
			if (min === 0) {
				zeroedFunc();
			} else if (min > 0) {
				userTimeElem.val(min - 1);
			}
		}, 60000);
	}

	if (!hasUserTime()) {
		makeUserTimeInvisible();
	}
	
	$('.header-beacon').click(headerBeaconClicked);
	$('#beacon').change(beaconClicked);
	
	$(".free > a").click(meetRequested);
	$(".offline > a").click(meetRequested);
	
	$("#message-form").submit(messageWritten);
	
	countdown($('.user-time > input'), function(){
		$('.user-time').html('<button class="btn btn-primary group-end header-beacon" type="button">illuminate beacon</button>');
	});
}
