var FREE = FREE || {};

FREE.FavoriteButton = (function(){
    function buttonClicked($parent, url, newButtonKind) {
        var friendId,
            buttonHtml;
        
        console.log('$parent: ' + $parent);
        friendId = $parent.data('friend-id');
        console.log('friendId: ' + friendId)
        
        $.post(url, {'friendId': friendId}, function(){
            buttonHtml = '<button class="' + newButtonKind + '-btn btn btn-default" type="button">' +
                newButtonKind + '</button>';
            $parent.html(buttonHtml);
            
            registerEventHandlers();
        });
    }
    
    function favoriteClicked() {
        buttonClicked($(this).parents('li')[0], '/favorites', 'unfavorite');
    }
    
    function unfavoriteClicked() {
        buttonClicked($(this).parents('li')[0], '/favorites/delete', 'favorite');
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
