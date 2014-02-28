var FREE = FREE || {};

FREE.FriendsList = (function(){
	function showFlash() {
		$('.flash').text('Loading friends...');
		$('.flash').show();
	}
	
	function findFriends(users, threads, fbFriends) {
		var friendsFinder = FREE.FriendsFinder;
		friendsFinder.init(users, threads, fbFriends);
		return friendsFinder.findFriends();
	}
	
	function registerModuleEventHandlers(module) {
		module.init();
		module.registerEventHandlers();
	}
	
	function showFriends(friendsHtml) {
		var $friends = $('.friends');
		$friends.html(friendsHtml);
		$friends.slideDown();
		
		registerModuleEventHandlers(FREE.DistanceFlyout);
		registerModuleEventHandlers(FREE.FavoriteButton);
		registerModuleEventHandlers(FREE.InviteLink);
	}
	
	function getUsers(fbFriends, threads) {
		$.getJSON('/users', {'requestor': 'jquery'}, function(data){
			var friends = findFriends(data.users, threads, fbFriends);
			friends.hasFriends = friends.freeFriends.length > 0
				|| friends.offlineFriends.length > 0;
			
			$.get('/friends', friends, function(data){
				showFriends(data);
				$('.flash').hide();
			});
		});
	}
	
	function loadThreads(fbFriends) {
		FB.api('/me/inbox', function(response){
			var data;
			
			if (response.error) {
				console.log(response.error);
			} else {
				data = {'fbFriends': fbFriends, 'threads': response.data};
				$.post('/fbFriends', data, function(){
					getUsers(fbFriends, response.data);
				});
			}
		});
	}
	
	function loadFbFriends() {
		FB.api('/me/friends?fields=id,name,username', function(response){
			if (response.error) {
				console.log(response.error);
			} else {
				loadThreads(response.data);
			}
		});
	}
	
	function loadFriends() {
		showFlash();
		
		$.getJSON('/fbFriends', {'format': 'json'}, function(data){
			if (data) {
				getUsers(data.fbFriends, data.threads);
			} else {
				loadFbFriends();
			}
		});
	}
	
    return {
		'init': $.noop,
		'loadFriends': loadFriends
	};
})();
