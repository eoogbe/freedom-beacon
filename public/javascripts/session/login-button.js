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
    
    function loadFbData(coords) {
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
        showFlash();
        loadFbData(pos.coords);
    }
    
    function loginWithoutLocation() {
        showFlash();
        loadFbData(null);
    }
    
    function addSessionData() {
        if ('geolocation' in navigator) {
            navigator.geolocation.watchPosition(afterWatching, loginWithoutLocation);
        } else {
            loginWithoutLocation();
        }
    }
    
    function loginClicked() {
        FB.login(function(response){
            if (response.authResponse) {
                FB.login(function(response) {
                    addSessionData();
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
