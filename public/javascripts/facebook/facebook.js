var FREE = FREE || {};

FREE.Facebook = (function(){
    var url
      , FB;
    
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
    
    function loadSdk() {
        // Load the SDK asynchronously
        (function(d){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";
            ref.parentNode.insertBefore(js, ref);
        }(document));
    }
    
    function initFacebook() {
        loadSdk();
    }
    
    function logoutClicked() {
        FB.logout();
		url.redirect('/');
    }
    
    function init(facebook) {
        FB = facebook;
        
        FB.init({
		  appId      : '1389788214618486',
		  status     : true, // check login status
		  cookie     : true, // enable cookies to allow the server to access the session
		  xfbml      : true  // parse XFBML
		});
        
        url = FREE.Url;
        url.init();
    }
    
    function registerEventHandlers() {
        // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
		// for any authentication related change, such as login, logout or session refresh. This means that
		// whenever someone who was previously logged out tries to log in again, the correct case below 
		// will be handled. 
		FB.Event.subscribe('auth.authResponseChange', authResponseChanged);
        
        $('button[name="logout"]').click(logoutClicked);
    }
    
    return {
        'init': init,
        'initFacebook': initFacebook,
        'registerEventHandlers': registerEventHandlers
    };
})();