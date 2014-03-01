var FREE = FREE || {};

FREE.InviteLink = (function(){
    var fbFriends;
    
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
        var fbFriendData = {'fbFriends': fbFriends, 'format': 'html'};
        
        $.get('/fbFriends', fbFriendData, function(data){
            $('.search-results-holder').html(data);
            $('.send-invite-link').click(sendInviteClicked);
        });
    }
    
    function sanitizeString(str) {
        return str.replace(/[^A-Za-z]/g, '');
    }
    
    function searched() {
        var searchText,
            searchRegexp;
        
        searchText = $.trim($('input[name="fbFriends-search"]').val());
        if (!searchText) return;
        
        searchRegexp = new RegExp('^' + sanitizeString(searchText), 'i');
        
        var searchResults = $.grep(fbFriends, function(friend){
            return sanitizeString(friend.name).search(searchRegexp) !== -1;
        });
        
        getFbFriendsHtml(searchResults);
    }
    
    function registerSearchHandler() {
        $('input[name="fbFriends-search"]').keyup(searched);
    }
    
    function loadFbFriends() {
        $.getJSON('/fbFriends', {'format': 'json'}, function(data){
            if ($.isEmptyObject(data)) {
                FB.api('/me/friends', function(response){
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        fbFriends = response.data;
                        registerSearchHandler();
                    }
                });
            } else {
                fbFriends = data.fbFriends;
                registerSearchHandler();
            }
        });
    }
    
    function inviteClicked() {
        var $inviteFlyout = $(this).parent().siblings('.invite-flyout');
        
        $.get('/invites', function(data){    
            $inviteFlyout.html(data);
            $inviteFlyout.show();
            
            addCloseHandler();
            loadFbFriends();
        });
    }
    
    function registerEventHandlers() {
        $('.invite-link').click(inviteClicked);
    }
    
    return {
        'init': $.noop,
        'registerEventHandlers': registerEventHandlers
    }
})();
