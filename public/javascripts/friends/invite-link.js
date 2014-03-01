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
        var fbFriendData = {'fbFriends': fbFriends, 'format': 'html'};
        
        $.get('/fbFriends', fbFriendData, function(data){
            $searchResultsHolder.html(data);
            $('.send-invite-link').click(sendInviteClicked);
        });
    }
    
    function sanitizeString(str) {
        return str.replace(/[^A-Za-z]/g, '');
    }
    
    function searchTyped() {
        var searchText,
            searchRegexp;
        
        searchText = $.trim($('input[name="fbFriends-search"]').val());
        if (!searchText) return;
        
        searchRegexp = new RegExp('^' + sanitizeString(searchText), 'i');
        
        var searchResults = $.grep(fbFriends, function(friend){
            return sanitizeString(friend.name).search(searchRegexp) !== -1;
        });
        
        getFbFriendsHtml(searchResults, $('.search-results-holder'));
    }
    
    function registerSearchHandler() {
        $('input[name="fbFriends-search"]').keypress(searchTyped);
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
        var $inviteFlyout,
            flyoutHtml;
        
        $inviteFlyout = $(this).parent().siblings('.invite-flyout');
        
        flyoutHtml = '<div class="clearfix">' +
            '<button class="close-btn pull-right" type="button">' +
            '<span class="glyphicon glyphicon-remove"></span> ' +
                'close</button></div>' +
            '<input type="search" role="search" ' +
                'name="fbFriends-search" ' +
                'placeholder="Enter a friend\'s name">' +
            '<div class="search-results-holder"></div>';
        
        $inviteFlyout.html(flyoutHtml);
        $inviteFlyout.show();
        
        addCloseHandler();
        loadFbFriends();
    }
    
    function registerEventHandlers() {
        $('.invite-link').click(inviteClicked);
    }
    
    return {
        'init': $.noop,
        'registerEventHandlers': registerEventHandlers
    }
})();
