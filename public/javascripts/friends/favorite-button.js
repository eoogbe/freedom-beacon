var FREE = FREE || {};

FREE.FavoriteButton = (function(){
    function buttonClicked($parent, url, newButtonKind) {
        var friendId,
            buttonHtml;
        
        friendId = $parent.data('friend-id');
        
        $.post(url, {'friendId': friendId}, function(){
            buttonHtml = '<button class="' + newButtonKind + '-btn" type="button">' +
                newButtonKind + '</button>';
            $parent.html(buttonHtml);
            
            registerEventHandlers();
        });
    }
    
    function favoriteClicked() {
        buttonClicked($(this).parent(), '/favorites', 'unfavorite');
    }
    
    function unfavoriteClicked() {
        buttonClicked($(this).parent(), '/favorites/delete', 'favorite');
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
