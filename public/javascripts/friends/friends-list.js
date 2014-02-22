var FREE = FREE || {};

FREE.FriendsList = (function(){
	function getFriendData(friend, fbFriend) {
		return {
			'name': friend.name,
			'fbUsername': fbFriend.username,
			'distance': friend.distance,
			'time': friend.time
		};
	}
	
	function addFriend(friends, friend, fbFriend) {
		if (friend.isFree) {
			var friendData = getFriendData(friend, fbFriend);
			friends.freeFriends.push(friendData);
		} else {
			friends.offlineFriends.push(friend);
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
	
	function showFriends(friendsHtml) {
		var $friends = $('.friends');
		$friends.html(friendsHtml);
		$friends.slideDown();
		
		var distanceFlyout = FREE.DistanceFlyout;
		distanceFlyout.init();
		distanceFlyout.registerEventHandlers();
	}
	
	function getUsers(fbFriends) {
		$.getJSON('/users', function(data){
			var friends = findFriends(data.users, fbFriends);
			
			$.get('/friends', friends, function(data){
				showFriends(data);
			});
		});
	}
	
	function loadFriends() {
		var userFbId = $('input[name="userFbId"]').val().slice(1);
		var path = '/' + userFbId + '/friends';
		
		FB.api(path, function(fbFriends){
			getUsers(fbFriends);
		});
	}
	
    return {
		'init': function(){},
		'loadFriends': loadFriends
	};
})();