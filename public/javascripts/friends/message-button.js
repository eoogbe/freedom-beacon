var FREE = FREE || {};

FREE.MessageButton = (function(){
    function showFlash() {
        $('.flash').text('Loading data...');
        $('.flash').show();
    }
    
    function goToMessage(msgUrl) {
        var urlNav = FREE.Url;
        urlNav.init();
        urlNav.redirect(msgUrl);
    }
    
	function hasFriendParticipant(participants, friendId) {
		for (var i = 0; i < participants.length; ++i) {
			if (participants[i].id === friendId) return true;
		}
		
		return false;
	}
	
	function getThreadId(threads, friendId) {
		for (var i = 0; i < threads.length; ++i) {
			if (hasFriendParticipant(threads[i].to, friendId)) {
				return threads[i].id;
			}
		}
		
		return null;
	}
	
    function loadThreads(friendId) {
        FB.api('/me/inbox', function(response){
            var threadId;
            
            if (response.error) {
                console.log(response.error);
            } else {
                threadId = getThreadId(response.data, friendId);
                
                if (threadId) {
                    goToMessage('https://m.facebook.com/messages/read/?tid=' + threadId);
                } else {
                    getUsername(friendId);
                }
            }
        });
    }
    
    function getUsername(fbId) {
        FB.api('/' + fbId, function(response){
            var msgUrl;
            
            if (response.error) {
                console.log(response.error);
            } else {
                msgUrl = 'https://facebook.com/messages/' + response.username;
                goToMessage(msgUrl);
            }
        });
    }
    
    function messageClicked() {
        var friendId = $(this).parents('li').data('friend-id');
        
        FB.login(function(response){
            showFlash();
            
            if (response.authResponse) {
                loadThreads(friendId);
            } else {
                getUsername(friendId);
            }
        }, {'scope': 'read_mailbox'});
    }
    
    function registerEventHandlers() {
        $('.msg-btn').click(messageClicked);
    }
    
    return {
        'init': $.noop,
        'registerEventHandlers': registerEventHandlers
    };
})();
