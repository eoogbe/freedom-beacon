var FREE = FREE || {};

FREE.LogoutButton = (function(){
    function redirectToHomepage() {
        var url = FREE.Url;
        url.init();
        url.redirect('/');
    }
    
    function logoutClicked() {
        FB.logout();
        redirectToHomepage();
    }
    
    function registerEventHandlers() {
        $('button[name="logout"]').click(logoutClicked);
    }
    
    return {
        'init': $.noop,
        'registerEventHandlers': registerEventHandlers
    }
})();
