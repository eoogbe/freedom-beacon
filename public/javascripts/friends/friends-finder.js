var FREE = FREE || {};

FREE.FriendsFinder = (function(){
	var users,
		threads,
		fbFriends;
	
	function hasFriendParticipant(participants, friendId) {
		for (var i = 0; i < participants.length; ++i) {
			if (participants[i].id === friendId) return true;
		}
		
		return false;
	}
	
	function getThreadId(friendId) {
		for (var i = 0; i < threads.length; ++i) {
			if (hasFriendParticipant(threads[i].participants, friendId)) {
				return threads[i].id;
			}
		}
		
		return null;
	}
	
	function getFriendUrl(fbFriend) {
		var threadId = getThreadId(fbFriend.id);
		return threadId
			? 'https://m.facebook.com/messages/read/?tid=' + threadId
			: 'https://facebook.com/messages/' + fbFriend.username;
	}
	
    function getFreeFriendData(friend, fbFriend) {
        return {
			'friendId': friend.fbId,
			'name': friend.name,
			'url': getFriendUrl(fbFriend),
			'distance': friend.distance,
			'time': friend.time,
			'isFavorite': friend.isFavorite
		};
    }
    
    function getOfflineFriendData(friend) {
		return {
			'friendId': friend.fbId,
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
	
	function getFriend(fbFriend) {
		for (var i = 0; i < users.length; ++i) {
			if (users[i].fbId == fbFriend.id) return users[i];
		}
		
		return null;
	}
	
	function findFriends() {
		var friends = { 'freeFriends': [], 'offlineFriends': [] };
		
		$.each(fbFriends, function(idx, fbFriend){
			var friend = getFriend(fbFriend);
			if (friend) addFriend(friends, friend, fbFriend);
		});
		
		return friends;
	}
	
	function init(u, t, f) {
		users = u;
		threads = t;
		fbFriends = f;
	}
    
    return {
        'init': init,
        'findFriends': findFriends
    };
})();
