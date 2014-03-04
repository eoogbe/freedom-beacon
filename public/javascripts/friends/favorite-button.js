var FREE = FREE || {};

FREE.FavoriteButton = (function(){
    function buttonClicked($btn, url) {
        var $parent,
            friendId,
            buttonHtml;
        
        $parent = $($btn.parents('li')[0]);
        friendId = $parent.data('friend-id');
        
        $.post(url, {'friendId': friendId}, function(data){
            $btn.parent().html(data);
            registerEventHandlers();
        });
    }
    
    function favoriteClicked() {
        buttonClicked($(this), '/favorites');
    }
    
    function unfavoriteClicked() {
        buttonClicked($(this), '/favorites/delete');
    }
    
    function registerEventHandlers() {
        $('.favorite-btn').click(favoriteClicked);
        $('.unfavorite-btn').click(unfavoriteClicked);
    }
    
    return {
        'init': $.noop,
        'registerEventHandlers': registerEventHandlers
    }
})();
