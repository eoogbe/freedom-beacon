describe('FriendsList', function(){
    describe('loadFriends', function(){
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
                {'id': 4, 'username': 'uname4'}
            ];
            
            FB = jasmine.createSpyObj('FB', ['api']);
            FB.api.and.callFake(function(path, done){
                done(fbFriends);
            });
            
            usersData =
            {
                'users': [
                    {
                        'name': 'user1',
                        'fbId': 1,
                        'distance': {'name': 'dist', 'description': 'desc'},
                        'time': 5,
                        'isFree': true
                    },
                    {
                        'name': 'user2',
                        'fbId': 2,
                        'isFree': false
                    },
                    {
                        'name': 'user3',
                        'fbId': 3,
                        'isFree': false
                    }
                ]
            };
            
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
            
            friendsList = FREE.FriendsList;
        });
        
        it('should get the Facebook friends', function(){
            FB.api.and.callFake(function(path, done){
                expect(path).toBe('/0/friends');
                done(fbFriends);
            });
            
            friendsList.init();
            friendsList.loadFriends();
            
            expect(FB.api).toHaveBeenCalled();
        });
        
        it('should get all the users', function(){
            jQuery.getJSON.and.callFake(function(url, done){
                expect(url).toBe('/users');
                done(usersData);
            });
            
            friendsList.init();
            friendsList.loadFriends();
            
            expect(jQuery.getJSON).toHaveBeenCalled();
        });
        
        it('should format the friend data for /friends', function(){
            jQuery.get.and.callFake(function(url, data, done){
                expect(url).toBe('/friends');
                
                expect(data.freeFriends.length).toBe(1);
                
                var freeFriend = data.freeFriends[0];
                expect(freeFriend.name).toBe('user1');
                expect(freeFriend.fbUsername).toBe('uname1');
                expect(freeFriend.distance).toEqual({'name': 'dist', 'description': 'desc'});
                expect(freeFriend.time).toBe(5);
                
                expect(data.offlineFriends.length).toBe(1);
                expect(data.offlineFriends[0].name).toBe('user2');
                
                done(friendsHtml);
            });
            
            friendsList.init();
            friendsList.loadFriends();
            
            expect(jQuery.get).toHaveBeenCalled();
        });
        
        it('should register the distance flyout event handlers', function(){
            friendsList.init();
            friendsList.loadFriends();
            
            expect(FREE.DistanceFlyout.init).toHaveBeenCalled();
            expect(FREE.DistanceFlyout.registerEventHandlers).toHaveBeenCalled();
        });
        
        it('should load the lists of friends', function(){
            friendsList.init();
            friendsList.loadFriends();
            
            expect($('.free')).toExist();
            expect($('.offline')).toExist();
        });
    });
});
