var FREE = FREE || {};

FREE.RequestButton = (function(){
    function friendAdded() {
        $(this).parent().html('<span class="glyphicon glyphicon-transfer"></span> pending');
    }
    
    function registerEventHandlers() {
        $('button[name="add-friend-btn"]').click(friendAdded);
    }
    
    return {
        'init': function(){},
        'registerEventHandlers': registerEventHandlers
    };
})();