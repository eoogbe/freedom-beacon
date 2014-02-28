var FREE = FREE || {};

FREE.Url = (function(){
    function redirect(url) {
        window.location = url;
    }
    
    function getPathname() {
        return window.location.pathname;
    }
    
    function goBack() {
        history.back(-1);
    }
    
    return {
        'init': $.noop,
        'redirect': redirect,
        'getPathname': getPathname,
        'goBack': goBack
    };
})();