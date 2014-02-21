var FREE = FREE || {};

FREE.Url = (function(){
    function redirect(url) {
        window.location = url;
    }
    
    function getPathname() {
        return window.location.pathname;
    }
    
    function getOrigin() {
        return window.location.origin;
    }
    
    function goBack() {
        history.back(-1);
    }
    
    return {
        'init': function(){},
        'redirect': redirect,
        'getPathname': getPathname,
        'getOrigin': getOrigin,
        'goBack': goBack
    };
})();