describe('InviteLink', function(){
    describe('registerEventHandlers()', function(){
        var fbFriends;
        var fbFriendsHtml;
        var inviteLink;
        
        beforeEach(function(){
            loadFixtures('friends/invite-link.html');
            
            fbFriends = {'data': [ { 'id': 1, 'name': 'friend1' } ]};
            fbFriendsHtml = readFixtures('friends/invite-flyout.html');
            
            FB = jasmine.createSpyObj('FB', ['api', 'ui']);
            FB.api.and.callFake(function(path, done){
                done(fbFriends);
            });
            
            spyOn(jQuery, 'get').and.callFake(function(url, data, done){
                done(fbFriendsHtml);
            });
            
            spyOn(FREE.CloseButton, 'registerEventHandlers');
            
            inviteLink = FREE.InviteLink;
            inviteLink.init();
        });
        
        it('should load the Facebook friends from Facebook', function(){
            FB.api.and.callFake(function(path, done){
                expect(path).toBe('/me/friends');
                done(fbFriends);
            });
            
            inviteLink.registerEventHandlers();
            $('.invite-link').click();
            
            expect(FB.api).toHaveBeenCalled();
        });
        
        it('should add the Facebook friends search flyout', function(){
            inviteLink.registerEventHandlers();
            $('.invite-link').click();
            
            expect($('.invite-flyout')).toBeVisible();
        });
        
        it('should register the search typed keypress handler', function(){
            inviteLink.registerEventHandlers();
            
            $('.invite-link').click();
            
            // Triggering the event won't set the value and vice versa
            $('input[name="fbFriends-search"]').val('F');
            var e = $.Event('keypress', {'keyCode': 70, 'which': 70});
            $('input[name="fbFriends-search"]').trigger(e);
            
            expect($('.fbFriends-list')).toExist();
        });
        
        it('should register the send invite link click handler', function(){
            inviteLink.registerEventHandlers();
            
            $('.invite-link').click();
            
            // Triggering the event won't set the value and vice versa
            $('input[name="fbFriends-search"]').val('F');
            var e = $.Event('keypress', {'keyCode': 70, 'which': 70});
            $('input[name="fbFriends-search"]').trigger(e);
            
            $('.send-invite-link').click();
            
            expect(FB.ui).toHaveBeenCalledWith({
                'method': 'send',
                'link': 'http://freedom-beacon.herokuapp.com',
                'to': 1,
                'appId': '5'
            });
        });
        
        it('should register the close button event handler', function(){
            inviteLink.registerEventHandlers();
            $('.invite-link').click();
            
            expect(FREE.CloseButton.registerEventHandlers).toHaveBeenCalled();
        });
    });
});
