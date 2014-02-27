var FREE = FREE || {};

FREE.FriendsList = (function(){
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
			});
		});
	}
	
	function loadThreads(fbFriends) {
		FB.api('/me/inbox', function(response){
			if (response.error) {
				console.log(response.error);
			} else {
				getUsers(fbFriends, response.data);
			}
		});
	}
	
	function loadFriends() {
		FB.api('/me/friends?fields=id,name,username', function(response){
			if (response.error) {
				console.log(response.error);
			} else {
				loadThreads(response.data);
			}
		});
	}
	
    return {
		'init': $.noop,
		'loadFriends': loadFriends
	};
})();
