var FREE = FREE || {};

FREE.Facebook = (function(){
    var url;
    
    function afterPost() {
        url.redirect('/beacons/create');
    }
    
    function afterWatching(pos) {
        FB.api('/me', function(response){
            var data;
            
            if (response.error) {
                console.log(response.error)
            } else {
                data =
                {
                    'fbId': response.id,
                    'name': response.name,
                    'coords': pos.coords
                };
                
                $.post('/sessions', data, afterPost);
            }
        });
    }
    
    function addSessionData() {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition(afterWatching);
        }
    }
    
    function loginClicked() {
        FB.getLoginStatus(function(response){
            if (response.status === 'connected') {
                addSessionData();
            } else {
                FB.login(function(response){
                    if (response.authResponse) addSessionData();
                });
            }
        });
    }
    
    function logoutClicked() {
        FB.logout();
		url.redirect('/');
    }
    
    function init(facebook) {
        $.ajaxSetup({'cache': true});
        $.getScript('//connect.facebook.net/en_US/all.js', function(){
            var friendsList;
            
            FB.init({
                'appId'      : $('input[name="app-id"]').val().slice(1),
                'status'     : true, // check login status
                'cookie'     : true, // enable cookies to allow the server to access the session
                'xfbml'      : true  // parse XFBML
            });
            
            $('button[name="login"]').prop('disabled', false);
            $('button[name="login"]').click(loginClicked);
            $('button[name="logout"]').click(logoutClicked);
            
            if ($('.friends').length > 0) {
                FB.getLoginStatus(function(response){
                    if (response.status === 'connected') {
                        friendsList = FREE.FriendsList;
                        friendsList.init();
                        friendsList.loadFriends();
                    }
                });
            }
        });
        
        url = FREE.Url;
        url.init();
    }
    
    return { 'init': init };
})();