'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
<<<<<<< HEAD
	function hasUserTime() {
		return !isNaN(parseInt($('.user-time > input').val()));
	}
=======
	$("#beacon").click(beaconClicked);

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
	    // Here we specify what we do with the response anytime this event occurs. 
	    if (response.status === 'connected') {
	      // The response object is returned with a status field that lets the app know the current
	      // login status of the person. In this case, we're handling the situation where they 
	      // have logged in to the app.
	      window.location="/beacons/new";
	    } else if (response.status === 'not_authorized') {
	      // In this case, the person is logged into Facebook, but not into the app, so we call
	      // FB.login() to prompt them to do so. 
	      // In real-life usage, you wouldn't want to immediately prompt someone to login 
	      // like this, for two reasons:
	      // (1) JavaScript created popup windows are blocked by most browsers unless they 
	      // result from direct interaction from people using the app (such as a mouse click)
	      // (2) it is a bad experience to be continually prompted to login upon page load.
	      FB.login();
	    } else {
	      // In this case, the person is not logged into Facebook, so we call the login() 
	      // function to prompt them to do so. Note that at this stage there is no indication
	      // of whether they are logged into the app. If they aren't then they'll see the Login
	      // dialog right after they log in to Facebook. 
	      // The same caveats as above apply to the FB.login() call here.
	      FB.login();
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

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Good to see you, ' + response.name + '.');
    });
  }
	
	$(".free > a").click(meetRequested);
	$(".offline > a").click(meetRequested);
>>>>>>> b461606a99717d93a442067d4632ea6ac1b463fd
	
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
