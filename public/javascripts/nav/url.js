var FREE = FREE || {};

FREE.Url = (function(){
    function redirect(url) {
        window.location = url;
    }
    
    function goBack() {
        history.back(-1);
    }
    
    return {
        'init': $.noop,
        'redirect': redirect,
        'goBack': goBack
    };
})();