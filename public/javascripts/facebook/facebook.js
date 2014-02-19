var FREE = FREE || {};

FREE.Facebook = (function(){
    var url;
    
    function authResponseChanged(response) {
        if (url.getPathname() === '/') {
            if (response.status === 'connected') {
                url.redirect('/beacons/create');
            } else {
                FB.login(function(){
                    url.redirect('/beacons/create');
                });
            }
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
        });
        
        url = FREE.Url;
        url.init();
    }
    
    return { 'init': init };
})();