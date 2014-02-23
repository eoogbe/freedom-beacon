var FREE = FREE || {};

FREE.FavoriteButton = (function(){
    function buttonClicked($parent, url, newButtonKind) {
        var friendId = $parent.data('friend-id');
        
        $.post(url, {'friendId': friendId}, function(){
            var buttonHtml = '<button class="' + newButtonKind + '-btn" type="button">' +
                newButtonKind + '</button>';
            $parent.html(buttonHtml);
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
        'init': function(){},
        'registerEventHandlers': registerEventHandlers
    }
})();
