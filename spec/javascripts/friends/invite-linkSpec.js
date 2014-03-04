describe('InviteLink', function(){
    describe('registerEventHandlers()', function(){
        var fbFriends,
            fbFriendsHtml;
        
        beforeEach(function(){
            loadFixtures('friends/invite-link.html');
            
            fbFriends = [ { 'id': 1, 'name': 'friend1' } ];
            fbFriendsHtml = readFixtures('friends/invite-flyout.html');
            
            FB = jasmine.createSpyObj('FB', ['api', 'ui']);
            FB.api.and.callFake(function(path, done){
                done({'data': fbFriends});
            });
            
            spyOn(jQuery, 'get').and.callFake(function(url, data, done){
                var invitesHtml;
                
                if (url === '/invites') {
                    invitesHtml = '<input name="fbFriends-search">' +
                        '<div class="search-results-holder"></div>';
                    data(invitesHtml);
                } else if (url === '/fbFriends') {
                    done(fbFriendsHtml);
                }
            });
            
            spyOn(FREE.CloseButton, 'registerEventHandlers');
            
            this.inviteLink = FREE.InviteLink;
            this.inviteLink.init();
        });
        
        it('should add the Facebook friends search flyout', function(){
            this.inviteLink.registerEventHandlers();
            $('.invite-link').click();
            
            expect($('.invite-flyout')).toBeVisible();
        });
        
        it('should register the search typed keypress handler', function(){
            this.inviteLink.registerEventHandlers();
            
            $('.invite-link').click();
            
            // Triggering the event won't set the value and vice versa
            $('input[name="fbFriends-search"]').val('F');
            $('input[name="fbFriends-search"]').trigger($.Event('input'));
            
            expect($('.fbFriends-list')).toExist();
        });
        
        it('should register the send invite link click handler', function(){
            this.inviteLink.registerEventHandlers();
            
            $('.invite-link').click();
            
            // Triggering the event won't set the value and vice versa
            $('input[name="fbFriends-search"]').val('F');
            $('input[name="fbFriends-search"]').trigger($.Event('input'));
            
            $('.send-invite-link').click();
            
            expect(FB.ui).toHaveBeenCalledWith({
                'method': 'send',
                'link': 'http://freedom-beacon.herokuapp.com',
                'to': 1,
                'appId': '5'
            });
        });
        
        it('should register the close button event handler', function(){
            this.inviteLink.registerEventHandlers();
            $('.invite-link').click();
            
            expect(FREE.CloseButton.registerEventHandlers).toHaveBeenCalled();
        });
        
        it('should load the Facebook friends from Facebook', function(){
            FB.api.and.callFake(function(path, done){
                expect(path).toBe('/me/friends');
                done(fbFriends);
            });
            
            this.inviteLink.registerEventHandlers();
            $('.invite-link').click();
            
            expect(FB.api).toHaveBeenCalled();
        });
    });
});
