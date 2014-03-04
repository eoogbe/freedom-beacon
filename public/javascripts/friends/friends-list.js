var FREE = FREE || {};

FREE.FriendsList = (function(){
	function showFlash() {
		$('.flash').text('Loading friends...');
		$('.flash').show();
	}
	
	function findFriends(users, fbFriends) {
		var friendsFinder = FREE.FriendsFinder;
		friendsFinder.init(users, fbFriends);
		return friendsFinder.findFriends();
	}
	
	// The query will convert false into a string that Handlebars will
	// treat as truthy, so we need to replace the boolean with an empty
	// string which is falsy.
	function convertToHandlebarsFalse(bool) {
		return bool ? true : '';
	}
	
	function addHasFriends(friends) {
		var hasFriends = friends.freeFriends.length > 0
			|| friends.offlineFriends.length > 0;
		friends.hasFriends = convertToHandlebarsFalse(hasFriends);
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
			addHasFriends(friends);
			
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
