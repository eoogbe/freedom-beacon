var FREE = FREE || {};

FREE.Facebook = (function(){
    var url;
    
    function afterPost() {
        url.redirect('/beacons/create');
    }
    
    function addSessionData() {
        FB.api('/me', function(response){
            var data =
            {
                'fbId': response.id,
                'name': response.name
            };
            
            $.post('/sessions', data, afterPost);
        });
    }
    
    function loginClicked() {
        if (FB.getLoginStatus() === 'connected') {
            addSessionData();
        } else {
            FB.login(function(response){
                if (response.authResponse) addSessionData();
            });
        }
    }
    
    function logoutClicked() {
        FB.logout();
		url.redirect('/');
    }
    
    function init(facebook) {
        $.ajaxSetup({'cache': true});
        $.getScript('//connect.facebook.net/en_US/all.js', function(){
            FB.init({
                'appId'      : $('input[name="app-id"]').val().slice(1),
                'status'     : true, // check login status
                'cookie'     : true, // enable cookies to allow the server to access the session
                'xfbml'      : true  // parse XFBML
            });
            
            $('button[name="logout"]').click(logoutClicked);
            $('button[name="login"]').click(loginClicked);
        });
        
        url = FREE.Url;
        url.init();
    }
    
    return { 'init': init };
})();