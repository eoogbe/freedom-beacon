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
    
    function getFbFriendsHtml(fbFriends, $inviteFlyout) {
        $.get('/fbFriends', {'fbFriends': fbFriends}, function(data){
            $inviteFlyout.html(data);
            $inviteFlyout.show();
            $('.send-invite-link').click(sendInviteClicked);
            addCloseHandler();
        });
    }
    
    function inviteClicked() {
        var $inviteFlyout = $(this).parent().siblings('.invite-flyout');
        
        FB.api('/me/friends', function(response){    
            if (response.error) {
                console.log(response.error);
            } else {
                getFbFriendsHtml(response.data, $inviteFlyout);
            }
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
