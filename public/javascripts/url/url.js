var FREE = FREE || {};

FREE.Url = (function(){
    function redirect(url) {
        window.location = url;
    }
    
    function getPathname() {
        return window.location.pathname;
    }
    
    return {
        'init': function(){},
        'redirect': redirect,
        'getPathname': getPathname
    };
})();