describe('FriendsList', function(){
    describe('loadFriends()', function(){
        var friendsList;
        var fbFriends;
        var usersData;
        var friendsHtml;
        
        beforeEach(function(){
            loadFixtures('friends/friends-list.html');
            setStyleFixtures('.friends {display: none}');
            
            fbFriends = [
                {'id': 1, 'username': 'uname1'},
                {'id': 2, 'username': 'uname2'},
                {'id': 3, 'username': 'uname3'},
                {'id': 5, 'username': 'uname5'},
                {'id': 6, 'username': 'uname6'}
            ];
            
            FB = jasmine.createSpyObj('FB', ['api']);
            FB.api.and.callFake(function(path, done){
                done(fbFriends);
            });
            
            usersData = getJSONFixture('users.json');
            
            spyOn(jQuery, 'getJSON').and.callFake(function(url, done){
                done(usersData);
            });
            
            friendsHtml = '<table class="free"><tr><td>user1</td></tr></table>'+
                '<ul class="offline"><li>user2</li></ul>';
            
            spyOn(jQuery, 'get').and.callFake(function(url, data, done){
                done(friendsHtml);
            });
            
            spyOn(FREE.DistanceFlyout, 'init');
            spyOn(FREE.DistanceFlyout, 'registerEventHandlers');
            
            spyOn(FREE.FavoriteButton, 'init');
            spyOn(FREE.FavoriteButton, 'registerEventHandlers');
            
            spyOn(FREE.InviteLink, 'init');
            spyOn(FREE.InviteLink, 'registerEventHandlers');
            
            friendsList = FREE.FriendsList;
            friendsList.init();
        });
        
        it('should get the Facebook friends', function(){
            FB.api.and.callFake(function(path, done){
                expect(path).toBe('/me/friends');
                done(fbFriends);
            });
            
            friendsList.loadFriends();
            
            expect(FB.api).toHaveBeenCalled();
        });
        
        it('should get all the users', function(){
            jQuery.getJSON.and.callFake(function(url, done){
                expect(url).toBe('/users');
                done(usersData);
            });
            
            friendsList.loadFriends();
            
            expect(jQuery.getJSON).toHaveBeenCalled();
        });
        
        it('should post the friend data to /friends', function(){
            jQuery.get.and.callFake(function(url, data, done){
                expect(url).toBe('/friends');
                done(friendsHtml);
            });
            
            friendsList.loadFriends();
            
            expect(jQuery.get).toHaveBeenCalled();
        });
        
        it('should split the friend data for /friends into free and offline friends', function(){
            jQuery.get.and.callFake(function(url, data, done){
                expect(data.freeFriends.length).toBe(2);
                expect(data.offlineFriends.length).toBe(2);
                
                done(friendsHtml);
            });
            
            friendsList.loadFriends();
            
            expect(jQuery.get).toHaveBeenCalled();
        });
        
        it('should put the favorites before the unfavorites for /friends', function(){
            jQuery.get.and.callFake(function(url, data, done){
                expect(data.freeFriends[0].name).toBe('user2');
                expect(data.freeFriends[1].name).toBe('user1');
                
                done(friendsHtml);
            });
            
            friendsList.loadFriends();
            
            expect(jQuery.get).toHaveBeenCalled();
        });
        
        it('should formate the free friends data for /friends', function(){
            jQuery.get.and.callFake(function(url, data, done){
                var freeFriend = data.freeFriends[1];
                expect(freeFriend.name).toBe('user1');
                expect(freeFriend.fbUsername).toBe('uname1');
                expect(freeFriend.distance).toEqual({'name': 'dist', 'description': 'desc'});
                expect(freeFriend.time).toBe(5);
                
                done(friendsHtml);
            });
            
            friendsList.loadFriends();
            
            expect(jQuery.get).toHaveBeenCalled();
        });
        
        it('should format the offline friends data for /friends', function(){
            jQuery.get.and.callFake(function(url, data, done){
                expect(data.offlineFriends[0].name).toBe('user5');
                expect(data.offlineFriends[1].name).toBe('user3');
                
                done(friendsHtml);
            });
            
            friendsList.loadFriends();
            
            expect(jQuery.get).toHaveBeenCalled();
        });
        
        it('should register the distance flyout event handlers', function(){
            friendsList.loadFriends();
            
            expect(FREE.DistanceFlyout.init).toHaveBeenCalled();
            expect(FREE.DistanceFlyout.registerEventHandlers).toHaveBeenCalled();
        });
        
        it('should register the favorite button handler', function(){
            friendsList.loadFriends();
            
            expect(FREE.FavoriteButton.init).toHaveBeenCalled();
            expect(FREE.FavoriteButton.registerEventHandlers).toHaveBeenCalled();
        });
        
        it('should register the invite link handler', function(){
            friendsList.loadFriends();
            
            expect(FREE.InviteLink.init).toHaveBeenCalled();
            expect(FREE.InviteLink.registerEventHandlers).toHaveBeenCalled();
        });
        
        it('should load the lists of friends', function(){
            friendsList.loadFriends();
            
            expect($('.free')).toBeVisible();
            expect($('.offline')).toBeVisible();
        });
    });
});
