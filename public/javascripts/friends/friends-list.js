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
		registerModuleEventHandlers(FREE.MessageButton);
		registerModuleEventHandlers(FREE.InviteLink);
	}
	
	function getUsers(fbFriends) {
		$.getJSON('/users', {'requestor': 'jquery'}, function(data){
			var users,
				friends;
			
			users = data.users ? data.users : [];
			friends = findFriends(users, fbFriends);
			friends.hasFriends = friends.freeFriends.length > 0
				|| friends.offlineFriends.length > 0;
			
			$.get('/friends', friends, function(data){
				showFriends(data);
				$('.flash').hide();
			});
		});
	}
	
	function loadFbFriends() {
		FB.api('/me/friends?fields=id,name,username', function(response){
			if (response.error) {
				console.log(response.error);
			} else {
				getUsers(response.data);
			}
		});
	}
	
	function loadFriends() {
		showFlash();
		loadFbFriends();
	}
	
    return {
		'init': $.noop,
		'loadFriends': loadFriends
	};
})();
