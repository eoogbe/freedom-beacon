var FREE = FREE || {};

FREE.LoginButton = (function(){
    function init() {
        $('button[name="login"]').prop('disabled', false);
    }
    
    function afterPost() {
        var url = FREE.Url;
        url.init();
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
