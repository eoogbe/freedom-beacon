describe('FriendsList', function(){
    describe('loadFriends()', function(){
        var friendsHtml;
        
        beforeEach(function(){
            loadFixtures('friends/friends-list.html');
            setStyleFixtures('.flash {display: none;} .friends {display: none;}');
            
            FB = jasmine.createSpyObj('FB', ['api']);
            FB.api.and.callFake(function(path, done){
                if (path === '/me/friends?fields=id,name,username') {
                    done({'data': 'fbFriends'});
                } else if (path === '/me/inbox') {
                    done({'data': 'threads'});
                }
            });
            
            spyOn(jQuery, 'getJSON').and.callFake(function(url, data, done){
                var fbFriendData;
                
                if (url === '/fbFriends') {
                    fbFriendsData =
                    {
                        'fbFriends': 'fbFriends',
                        'threads': 'threads'
                    };
                    
                    done(fbFriendsData);
                } else if (url === '/users') {
                    done({'users': 'users'});
                }
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
            
            spyOn(jQuery, 'post').and.callFake(function(url, data, done){
                done();
            });
            
            spyOn(FREE.DistanceFlyout, 'registerEventHandlers');
            spyOn(FREE.FavoriteButton, 'registerEventHandlers');
            spyOn(FREE.InviteLink, 'registerEventHandlers');
            
            this.friendsList = FREE.FriendsList;
            this.friendsList.init();
        });
        
        it('should get all the users', function(){
            jQuery.getJSON.and.callFake(function(url, data, done){
                var fbFriendData;
                
                if (url === '/fbFriends') {
                    fbFriendsData =
                    {
                        'fbFriends': 'fbFriends',
                        'threads': 'threads'
                    };
                    
                    done(fbFriendsData);
                } else if (url === '/users') {
                    expect(data).toEqual({'requestor': 'jquery'});
                    done({'users': 'users'});
                }
            });
            
            this.friendsList.loadFriends();
            
            expect(jQuery.getJSON.calls.count()).toBe(2);
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
        
        it('should hide the flash after done', function(){
            this.friendsList.loadFriends();
            expect($('.flash')).toBeHidden();
        });
        
        describe('when Facebook friends are stored', function(){
            it('should get friends from the database', function(){
                jQuery.getJSON.and.callFake(function(url, data, done){
                    var fbFriendData;
                    
                    if (url === '/fbFriends') {
                        fbFriendsData =
                        {
                            'fbFriends': 'fbFriends',
                            'threads': 'threads'
                        };
                        
                        expect(data).toEqual({'format': 'json'});
                        
                        done(fbFriendsData);
                    } else if (url === '/users') {
                        done({'users': 'users'});
                    }
                });
                
                this.friendsList.loadFriends();
                
                expect(jQuery.getJSON.calls.count()).toBe(2);
            });
            
            it('should not get the Facebook friends or threads again', function(){
                this.friendsList.loadFriends();
                expect(FB.api).not.toHaveBeenCalled();
            });
        });
        
        describe('when Facebook friends are not stored', function(){
            beforeEach(function(){
                jQuery.getJSON.and.callFake(function(url, data, done){
                    if (url === '/fbFriends') {
                        done({});
                    } else if (url === '/users') {
                        done({'users': 'users'});
                    }
                });
            });
            
            it('should get the Facebook friends', function(){
                this.friendsList.loadFriends();
                expect(FB.api.calls.argsFor(0)[0])
                    .toBe('/me/friends?fields=id,name,username');
            });
            
            it('should get the threads', function(){
                this.friendsList.loadFriends();
                expect(FB.api.calls.argsFor(1)[0]).toBe('/me/inbox');
            });
            
            it('should post the Facebook friends', function(){
                jQuery.post.and.callFake(function(url, data, done){
                    var expectedData =
                    {
                        'fbFriends': 'fbFriends',
                        'threads': 'threads'
                    };
                    
                    expect(url).toBe('/fbFriends');
                    expect(data).toEqual(expectedData);
                    
                    done();
                });
                
                this.friendsList.loadFriends();
                
                expect(jQuery.post).toHaveBeenCalled();
            });
        });
    });
});
