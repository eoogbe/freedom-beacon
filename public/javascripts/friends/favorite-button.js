var FREE = FREE || {};

FREE.FavoriteButton = (function(){
    function buttonClicked(url, newButtonKind) {
        var $parent,
            friendId,
            buttonHtml;
        
        $parent = $(this).parents('li')[0];
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
        buttonClicked('/favorites', 'unfavorite');
    }
    
    function unfavoriteClicked() {
        buttonClicked('/favorites/delete', 'favorite');
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
