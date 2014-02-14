'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	window.fbAsyncInit = function() {
		FB.init({
		  appId      : '1389788214618486',
		  status     : true, // check login status
		  cookie     : true, // enable cookies to allow the server to access the session
		  xfbml      : true  // parse XFBML
		});
	
		// Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
		// for any authentication related change, such as login, logout or session refresh. This means that
		// whenever someone who was previously logged out tries to log in again, the correct case below 
		// will be handled. 
		FB.Event.subscribe('auth.authResponseChange', function(response) {
			if (window.location.pathname === '/') {
				if (response.status === 'connected') {
					window.location.href = "/beacons/new";
				} else {
					FB.login(function(){
					  window.location.href = "/beacons/new";
					});
				}
			}
		});
	};

	// Load the SDK asynchronously
	(function(d){
	 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement('script'); js.id = id; js.async = true;
	 js.src = "//connect.facebook.net/en_US/all.js";
	 ref.parentNode.insertBefore(js, ref);
	}(document));
	
	$(".free > a").click(meetRequested);
	$(".offline > a").click(meetRequested);
	
	function hasUserTime() {
		return !isNaN(parseInt($('.user-time > input').val()));
	}
	
	function makeUserTimeInvisible() {
		$('.user-time > input').css('visibility', 'hidden');
	}
	
	function headerBeaconClicked(e) {
		$('.user-time').html('<input type="number" max="60" min="1" value="30" name="user-time" class="group-end" autofocus>');
	}
	
	var beaconTimerId = null;
	
	function beaconClicked(e) {
		if ($('#beacon').is(':checked')) {
			$('.beacon-btn').text('deactivate beacon');
			
			$('.beacon-btn').removeClass('btn-primary');
			$('.beacon-btn').addClass('btn-default');
			
			$('.user-time-label > input').prop('readonly', true);
			$('.user-time-label > input').addClass('readonly');
			
			beaconTimerId = countdown($('.user-time-label > input'), function(){
				$('.beacon-btn').text('illuminate beacon');
			});
		} else {
			$('.user-time-label > input').prop('readonly', null);
			$('.user-time-label > input').removeClass('readonly');
			
			$('.beacon-btn').addClass('btn-primary');
			$('.beacon-btn').removeClass('btn-default');
			
			$('.beacon-btn').text('illuminate beacon');
			clearInterval(beaconTimerId);
		}
	}
	
	function meetRequested(e) {
		e.preventDefault();
		
		var status = $(this).find(".status");
		status.text("pinged");
	}
	
	function logoutClicked(e) {
		FB.logout();
		window.location.href = '/';
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
	
	$('.logout').click(logoutClicked);
	
	$("#message-form").submit(messageWritten);
	
	countdown($('.user-time > input'), function(){
		$('.user-time').html('<button class="btn btn-primary group-end header-beacon" type="button">illuminate beacon</button>');
	});
}
