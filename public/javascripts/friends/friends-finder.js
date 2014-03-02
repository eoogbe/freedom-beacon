var FREE = FREE || {};

FREE.FriendsFinder = (function(){
	var users,
		fbFriends;
	
    function getFreeFriendData(friend, fbFriend) {
        return {
			'friendId': friend.userId,
			'fbId': friend.fbId,
			'name': friend.name,
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
	
	function init(u, f) {
		users = u;
		fbFriends = f;
	}
    
    return {
        'init': init,
        'findFriends': findFriends
    };
})();
