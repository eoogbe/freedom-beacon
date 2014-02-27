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
    
    function getFbFriendsHtml(fbFriends, $searchResultsHolder) {
        $.get('/fbFriends', {'fbFriends': fbFriends}, function(data){
            $searchResultsHolder.html(data);
            $('.send-invite-link').click(sendInviteClicked);
        });
    }
    
    function sanitizeString(str) {
        return str.replace(/[^A-Za-z]/g, '');
    }
    
    function searchTyped() {
        var searchText,
            searchRegexp,
            searchResults;
        
        searchText = $.trim($('input[name="fbFriends-search"]').val());
        if (!searchText) return;
        
        searchRegexp = new RegExp('^' + sanitizeString(searchText), 'i');
        
        searchResults = $.grep(fbFriends, function(friend){
            return sanitizeString(friend.name).search(searchRegexp) !== -1;
        });
        
        getFbFriendsHtml(searchResults, $('.search-results-holder'));
    }
    
    function inviteClicked() {
        var $inviteFlyout,
            flyoutHtml;
        
        $inviteFlyout = $(this).parent().siblings('.invite-flyout');
        
        FB.api('/me/friends', function(response){    
            if (response.error) {
                console.log(response.error);
            } else {
                flyoutHtml = '<div class="clearfix"><button class="close-btn pull-right" type="button">' +
                    '<span class="glyphicon glyphicon-remove"></span> ' +
                        'close</button></div>' +
                    '<input type="search" role="search" ' +
                        'name="fbFriends-search">' +
                    '<div class="search-results-holder"></div>';
                
                fbFriends = response.data;
                
                $inviteFlyout.html(flyoutHtml);
                $inviteFlyout.show();
                addCloseHandler();
                
                $('input[name="fbFriends-search"]').keypress(searchTyped);
            }
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
