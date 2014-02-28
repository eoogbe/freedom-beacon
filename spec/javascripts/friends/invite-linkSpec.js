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
            
            spyOn(jQuery, 'getJSON').and.callFake(function(url, data, done){
                done({'fbFriends': fbFriends});
            });
            
            spyOn(jQuery, 'get').and.callFake(function(url, data, done){
                done(fbFriendsHtml);
            });
            
            spyOn(FREE.CloseButton, 'registerEventHandlers');
            
            this.inviteLink = FREE.InviteLink;
            this.inviteLink.init();
        });
        
        it('should check if friends are stored', function(){
            jQuery.getJSON.and.callFake(function(url, data, done){
                expect(url).toBe('/fbFriends');
                expect(data).toEqual({'format': 'json'});
                
                done({'fbFriends': fbFriends});
            });
            
            this.inviteLink.registerEventHandlers();
            $('.invite-link').click();
            
            expect(jQuery.getJSON).toHaveBeenCalled();
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
            var e = $.Event('keypress', {'keyCode': 70, 'which': 70});
            $('input[name="fbFriends-search"]').trigger(e);
            
            expect($('.fbFriends-list')).toExist();
        });
        
        it('should add the Facebook friends html', function(){
            jQuery.get.and.callFake(function(url, data, done){
                var expectedFbFriends = [ { 'id': 1, 'name': 'friend1' } ];
                
                expect(url).toBe('/fbFriends');
                expect(data.fbFriends).toEqual(expectedFbFriends);
                
                done(fbFriendsHtml);
            });
            
            this.inviteLink.registerEventHandlers();
            
            $('.invite-link').click();
            
            // Triggering the event won't set the value and vice versa
            $('input[name="fbFriends-search"]').val('F');
            var e = $.Event('keypress', {'keyCode': 70, 'which': 70});
            $('input[name="fbFriends-search"]').trigger(e);
            
            expect(jQuery.get).toHaveBeenCalled();
        });
        
        it('should register the send invite link click handler', function(){
            this.inviteLink.registerEventHandlers();
            
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
            this.inviteLink.registerEventHandlers();
            $('.invite-link').click();
            
            expect(FREE.CloseButton.registerEventHandlers).toHaveBeenCalled();
        });
        
        describe('when Facebook friends stored', function(){
            it('should not load the Facebook friends from Facebook', function(){
                this.inviteLink.registerEventHandlers();
                $('.invite-link').click();
                
                expect(FB.api).not.toHaveBeenCalled();
            });
        })
        
        describe('when no Facebook friends stored', function(){
            it('should load the Facebook friends from Facebook', function(){
                jQuery.getJSON.and.callFake(function(url, data, done){
                    done({});
                });
                
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
});
