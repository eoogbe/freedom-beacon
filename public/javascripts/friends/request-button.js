var FREE = FREE || {};

FREE.RequestButton = (function(){
    function friendAdded() {
        $(this).parent().html('<span class="glyphicon glyphicon-transfer"></span> pending');
        $.post('/requests', {'thisFriend':$(this).data("_id")}, makePending);
    }

    function makePending() {
        $('button[name="add-friend-btn"]').replaceWith("<h4>Pending</h4>");
    }
    
    function registerEventHandlers() {
        $('button[name="add-friend-btn"]').click(friendAdded);
    }
    
    return {
        'init': function(){},
        'registerEventHandlers': registerEventHandlers
    };
})();