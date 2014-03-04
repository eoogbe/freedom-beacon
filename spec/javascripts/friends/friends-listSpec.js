describe('FriendsList', function(){
    describe('loadFriends()', function(){
        var friendsHtml;
        
        beforeEach(function(){
            loadFixtures('friends/friends-list.html');
            setStyleFixtures('.flash {display: none;} .friends {display: none;}');
            
            FB = jasmine.createSpyObj('FB', ['api']);
            FB.api.and.callFake(function(path, done){
                done({'data': 'fbFriends'});
            });
            
            spyOn(jQuery, 'getJSON').and.callFake(function(url, data, done){
                done({'users': 'users'});
            });
            
            spyOn(FREE.FriendsFinder, 'init');
            spyOn(FREE.FriendsFinder, 'findFriends').and.returnValue({
                'freeFriends': ['friend1'],
                'offlineFriends': ['friend2']
            });
            
            friendsHtml = '<ul class="free"><li>user1</li></ul>'+
                '<ul class="offline"><li>user2</li></ul>';
            
            spyOn(jQuery, 'get').and.callFake(function(url, data, done){
                done(friendsHtml);
            });
            
            spyOn(jQuery, 'post').and.callFake(function(url, data, done){
                done();
            });
            
            spyOn(FREE.DistanceFlyout, 'registerEventHandlers');
            spyOn(FREE.FavoriteButton, 'registerEventHandlers');
            spyOn(FREE.MessageButton, 'registerEventHandlers');
            spyOn(FREE.InviteLink, 'registerEventHandlers');
            
            this.friendsList = FREE.FriendsList;
            this.friendsList.init();
        });
        
        it('should get all the users', function(){
            jQuery.getJSON.and.callFake(function(url, data, done){
                expect(data).toEqual({'requestor': 'jquery'});
                done({'users': 'users'});
            });
            
            this.friendsList.loadFriends();
            
            expect(jQuery.getJSON).toHaveBeenCalled();
        });
        
        it('should get the friend html from /friends', function(){
            jQuery.get.and.callFake(function(url, data, done){
                expect(url).toBe('/friends');
                expect(data.hasFriends).toBe(true);
                
                done(friendsHtml);
            });
            
            this.friendsList.loadFriends();
            
            expect(jQuery.get).toHaveBeenCalled();
        });
        
        it('should find the friends', function(){
            this.friendsList.loadFriends();
            
            expect(FREE.FriendsFinder.init)
                .toHaveBeenCalledWith('users', 'fbFriends');
            expect(FREE.FriendsFinder.findFriends).toHaveBeenCalled();
        });
        
        it('should register the distance flyout event handlers', function(){
            spyOn(FREE.DistanceFlyout, 'init');
            
            this.friendsList.loadFriends();
            
            expect(FREE.DistanceFlyout.init).toHaveBeenCalled();
            expect(FREE.DistanceFlyout.registerEventHandlers)
                .toHaveBeenCalled();
        });
        
        it('should register the favorite button handler', function(){
            spyOn(FREE.FavoriteButton, 'init');
            
            this.friendsList.loadFriends();
            
            expect(FREE.FavoriteButton.init).toHaveBeenCalled();
            expect(FREE.FavoriteButton.registerEventHandlers)
                .toHaveBeenCalled();
        });
        
        it('should register the message button handler', function(){
            spyOn(FREE.MessageButton, 'init');
            
            this.friendsList.loadFriends();
            
            expect(FREE.MessageButton.init).toHaveBeenCalled();
            expect(FREE.MessageButton.registerEventHandlers)
                .toHaveBeenCalled();
        });
        
        it('should register the invite link handler', function(){
            spyOn(FREE.InviteLink, 'init');
            
            this.friendsList.loadFriends();
            
            expect(FREE.InviteLink.init).toHaveBeenCalled();
            expect(FREE.InviteLink.registerEventHandlers).toHaveBeenCalled();
        });
        
        it('should load the lists of friends', function(){
            this.friendsList.loadFriends();
            
            expect($('.free')).toBeVisible();
            expect($('.offline')).toBeVisible();
        });
        
        it('should hide the flash after done', function(){
            this.friendsList.loadFriends();
            expect($('.flash')).toBeHidden();
        });
        
        it('should get the Facebook friends', function(){
            this.friendsList.loadFriends();
            expect(FB.api.calls.argsFor(0)[0])
                .toBe('/me/friends?fields=id,name,username');
        });
    });
});
