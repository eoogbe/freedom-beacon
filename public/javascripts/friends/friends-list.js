var FREE = FREE || {};

FREE.FriendsList = (function(){
	function getFreeFriendData(friend, fbFriend) {
		return {
			'friendId': friend.userId,
			'name': friend.name,
			'fbUsername': fbFriend.username,
			'distance': friend.distance,
			'time': friend.time,
			'isFavorite': friend.isFavorite
		};
	}
	
	function getOfflineFriendData(friend) {
		return {
			'friendId': friend.userId,
			'name': friend.name,
			'isFavorite': friend.isFavorite
		};
	}
	
	function addFriend(friends, friend, fbFriend) {
		var friendData;
		
		if (friend.isFree) {
			friendData = getFreeFriendData(friend, fbFriend);
			
			if (friend.isFavorite) {
				friends.freeFriends.unshift(friendData);
			} else {
				friends.freeFriends.push(friendData);
			}
		} else {
			friendData = getOfflineFriendData(friend);
			
			if (friend.isFavorite) {
				friends.offlineFriends.unshift(friendData);
			} else {
				friends.offlineFriends.push(friendData);
			}
		}
	}
	
	function getFriend(users, fbFriend) {
		for (var i = 0; i < users.length; ++i) {
			if (users[i].fbId == fbFriend.id) return users[i];
		}
		
		return null;
	}
	
	function findFriends(users, fbFriends) {
		var friends = { 'freeFriends': [], 'offlineFriends': [] };
		
		$.each(fbFriends, function(idx, fbFriend){
			var friend = getFriend(users, fbFriend);
			if (friend) addFriend(friends, friend, fbFriend);
		});
		
		return friends;
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
	
	function getUsers(fbFriends) {
		$.getJSON('/users', {'requestor': 'jquery'}, function(data){
			var friends = findFriends(data.users, fbFriends);
			friends.hasFriends = friends.freeFriends.length > 0
				|| friends.offlineFriends.length > 0;
			
			$.get('/friends', friends, function(data){
				showFriends(data);
			});
		});
	}
	
	function loadFriends() {
		FB.api('/me/friends?fields=id,name,username', function(response){
			if (response.error) {
				console.log(response.error);
			} else {
				getUsers(response.data);
			}
		});
	}
	
    return {
		'init': function(){},
		'loadFriends': loadFriends
	};
})();
