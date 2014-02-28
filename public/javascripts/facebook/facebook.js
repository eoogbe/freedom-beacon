var FREE = FREE || {};

FREE.Facebook = (function(){
    function registerLoginHandler() {
        var loginButton = FREE.LoginButton;
        loginButton.init();
        loginButton.registerEventHandlers();
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
            
            registerLoginHandler();
            
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
    }
    
    return { 'init': init };
})();
