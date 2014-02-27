describe('FriendsList', function(){
    describe('loadFriends()', function(){
        var friendsHtml;
        
        beforeEach(function(){
            setFixtures(sandbox({'class': 'friends'}));
            setStyleFixtures('.friends {display: none}');
            
            FB = jasmine.createSpyObj('FB', ['api']);
            FB.api.and.callFake(function(path, done){
                if (path === '/me/friends?fields=id,name,username') {
                    done({'data': 'fbFriends'});
                } else if (path === '/me/inbox') {
                    done({'data': 'threads'});
                }
            });
            
            spyOn(jQuery, 'getJSON').and.callFake(function(url, data, done){
                done({'users': 'users'});
            });
            
            spyOn(FREE.FriendsFinder, 'init');
            spyOn(FREE.FriendsFinder, 'findFriends').and.returnValue({
                'freeFriends': ['friend1'],
                'offlineFriends': ['friend2']
            });
            
            friendsHtml = '<table class="free"><tr><td>user1</td></tr></table>'+
                '<ul class="offline"><li>user2</li></ul>';
            
            spyOn(jQuery, 'get').and.callFake(function(url, data, done){
                done(friendsHtml);
            });
            
            spyOn(FREE.DistanceFlyout, 'registerEventHandlers');
            spyOn(FREE.FavoriteButton, 'registerEventHandlers');
            spyOn(FREE.InviteLink, 'registerEventHandlers');
            
            this.friendsList = FREE.FriendsList;
            this.friendsList.init();
        });
        
        it('should get the Facebook friends', function(){
            this.friendsList.loadFriends();
            expect(FB.api.calls.argsFor(0)[0])
                .toBe('/me/friends?fields=id,name,username');
        });
        
        it('should add the thread ids', function(){
            this.friendsList.loadFriends();
            expect(FB.api.calls.argsFor(1)[0]).toBe('/me/inbox');
        });
        
        it('should get all the users', function(){
            jQuery.getJSON.and.callFake(function(url, data, done){
                expect(url).toBe('/users');
                expect(data).toEqual({'requestor': 'jquery'});
                
                done('users');
            });
            
            this.friendsList.loadFriends();
            
            expect(jQuery.getJSON).toHaveBeenCalled();
        });
        
        it('should get the friend html from /friends', function(){
            jQuery.get.and.callFake(function(url, data, done){
                expect(url).toBe('/friends');
                done(friendsHtml);
            });
            
            this.friendsList.loadFriends();
            
            expect(jQuery.get).toHaveBeenCalled();
        });
        
        it('should find the friends', function(){
            this.friendsList.loadFriends();
            
            expect(FREE.FriendsFinder.init)
                .toHaveBeenCalledWith('users', 'threads', 'fbFriends');
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
    });
});
