var FREE = FREE || {};

FREE.AddButton = (function(){
    function friendAdded() {
        $(this).parent().html('<span class="glyphicon glyphicon-ok"></span> added');
        $.post('/friends', {'thisFriend':$(this).data("_id")}, makeAdded);
    }

    function makeAdded() {
        $('button[name="add-friend-btn"]').replaceWith("<h4>glyphicon glyphicon-ok</h4>");
    }
    
    function registerEventHandlers() {
        $('button[name="add-friend-btn"]').click(friendAdded);
    }
    
    return {
        'init': function(){},
        'registerEventHandlers': registerEventHandlers
    };
})();