var FREE = FREE || {};

FREE.LoginButton = (function(){
    function init() {
        $('button[name="login"]').prop('disabled', false);
    }
    
    function showFlash() {
        $('.flash').text('Loading data...');
        $('.flash').show();
    }
    
    function afterPost() {
        var url = FREE.Url;
        url.init();
        url.redirect('/beacons/create');
    }
    
    function getFbData(coords) {
        showFlash();
        
        FB.api('/me', function(response){
            var data;
            
            if (response.error) {
                console.log(response.error)
            } else {
                data =
                {
                    'fbId': response.id,
                    'name': response.name,
                    'coords': coords
                };
                
                $.post('/sessions', data, afterPost);
            }
        });
    }
    
    function afterWatching(pos) {
        getFbData(pos.coords);
    }
    
    function withLocationClicked() {
        addSessionData();
    }
    
    function withoutLocationClicked() {
        getFbData(null);
    }
    
    function handleWatchingErrors(err) {
        var locationFlyout;
        
        if (err.code === err.PERMISSION_DENIED) {
            $('.location-flyout').show();
            
            $('button[name="with-location"]').click(withLocationClicked);
            $('button[name="without-location"]').click(withoutLocationClicked);
        } else if (err.code === err.POSITION_UNAVAILABLE) {
            getFbData(null);
        }
    }
    
    function addSessionData() {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition(afterWatching, handleWatchingErrors);
        } else {
            getFbData(null);
        }
    }
    
    function loginClicked() {
        FB.getLoginStatus(function(response){
            if (response.status === 'connected') {
                addSessionData();
            } else {
                FB.login(function(response){
                    if (response.authResponse) addSessionData();
                }, {'scope': 'read_mailbox'});
            }
        });
    }
    
    function registerEventHandlers() {
        $('button[name="login"]').click(loginClicked);
    }
    
    return {
        'init': init,
        'registerEventHandlers': registerEventHandlers
    };
})();
