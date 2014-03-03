var FREE = FREE || {};

FREE.FavoriteButton = (function(){
    function buttonClicked($btn, url, newButtonGlyph, newButtonKind) {
        var $parent,
            friendId,
            buttonHtml;
        
        $parent = $($btn.parents('li')[0]);
        friendId = $parent.data('friend-id');
        
        $.post(url, {'friendId': friendId}, function(){
            buttonHtml = '<button class="' + newButtonKind + '-btn btn btn-default" type="button">' + '<span class="glyphicon glyphicon-star' + newButtonGlyph + '"></span>' + '</button>';
            $btn.parent().html(buttonHtml);

            
            
            registerEventHandlers();
        });
    }
    
    function favoriteClicked() {
        buttonClicked($(this), '/favorites', '', 'unfavorite');
    }
    
    function unfavoriteClicked() {
        buttonClicked($(this), '/favorites/delete', '-empty', 'favorite');
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
