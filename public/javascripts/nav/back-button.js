var FREE = FREE || {};

FREE.BackButton = (function(){
    function backClicked(e) {
        e.preventDefault();
        
        var url = FREE.Url;
        url.init();
        url.goBack();
    }
    
    function registerEventHandlers() {
        $('.back-btn').click(backClicked);
    }
    
    return {
        'init': $.noop,
        'registerEventHandlers': registerEventHandlers
    };
})();
