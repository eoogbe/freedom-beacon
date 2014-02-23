var FREE = FREE || {};

FREE.InviteLink = (function(){
    function sendInviteClicked() {
        var friendId = $(this).data('fb-id');
        
        FB.ui({
            'appId': $('input[name="app-id"]').val().slice(1),
            'method': 'send',
            'to': friendId,
            'link': 'http://freedom-beacon.herokuapp.com'
        });
    }
    
    function addCloseHandler() {
        var closeButton = FREE.CloseButton;
        closeButton.init();
        closeButton.registerEventHandlers();
    }
    
    function getFbFriendsHtml(fbFriends) {
        $.get('/fbFriends', {'fbFriends': fbFriends}, function(data){
            $('.invite-flyout').html(data);
            $('.send-invite-link').click(sendInviteClicked);
            addCloseHandler();
        });
    }
    
    function inviteClicked() {
        FB.api('/me/friends', function(fbFriends){
            console.log(fbFriends);
            getFbFriendsHtml(fbFriends);
        });
    }
    
    function registerEventHandlers() {
        $('.invite-link').click(inviteClicked);
    }
    
    return {
        'init': function(){},
        'registerEventHandlers': registerEventHandlers
    }
})();
