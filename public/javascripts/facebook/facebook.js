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
                'username': response.username,
                'name': response.name
            };
            
            $.post('/sessions', data, afterPost);
        });
    }
    
    function loggedIn(response) {
        if (response.authResponse) {
            addSessionData();
        }
    }
    
    function authResponseChanged(response) {
        if (url.getPathname() === '/') {
            if (response.status === 'connected') {
                addSessionData();
            } else {
                FB.login(loggedIn);
            }
        }
    }
    
    function logoutClicked() {
        FB.logout();
		url.redirect('/');
    }
    
    function messageClicked(e) {
        e.preventDefault();
        
        FB.ui({
            'method': 'send',
            'link': url.getOrigin(),
            'to': $(this).data('username')
        });
    }
    
    function init(facebook) {
        $.ajaxSetup({'cache': true});
        $.getScript('//connect.facebook.net/en_US/all.js', function(){
            FB.init({
                appId      : $('input[name="app-id"]').val(),
                status     : true, // check login status
                cookie     : true, // enable cookies to allow the server to access the session
                xfbml      : true  // parse XFBML
            });
                
            // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
            // for any authentication related change, such as login, logout or session refresh. This means that
            // whenever someone who was previously logged out tries to log in again, the correct case below 
            // will be handled. 
            FB.Event.subscribe('auth.authResponseChange', authResponseChanged);
            
            $('button[name="logout"]').click(logoutClicked);
            $('.message-link').click(messageClicked);
        });
        
        url = FREE.Url;
        url.init();
    }
    
    return { 'init': init };
})();