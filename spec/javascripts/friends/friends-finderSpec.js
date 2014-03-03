describe('FriendFinder', function(){
    describe('findFriends()', function(){
        beforeEach(function(){
            var fbFriends,
                users,
                friendsFinder;
            
            fbFriends = [
                {'id': 1, 'username': 'uname1'},
                {'id': 2, 'username': 'uname2'},
                {'id': 3, 'username': 'uname3'},
                {'id': 5, 'username': 'uname5'},
                {'id': 6, 'username': 'uname6'}
            ];
            
            users = getJSONFixture('users.json').users;
            
            friendsFinder = FREE.FriendsFinder;
            friendsFinder.init(users, fbFriends);
            
            this.friends = friendsFinder.findFriends();
        });
        
        it('should split the friends into free and offline', function(){
            expect(this.friends.freeFriends.length).toBe(2);
            expect(this.friends.offlineFriends.length).toBe(2);
        });
        
        it('should put the favorites before the unfavorites', function(){
            expect(this.friends.freeFriends[0].name).toBe('user2');
            expect(this.friends.freeFriends[1].name).toBe('user1');
        });
        
        describe('with free friends', function(){
            beforeEach(function(){
                this.friend = this.friends.freeFriends[1];
            });
            
            it('should have the user id', function(){
                expect(this.friend.friendId).toBe("000000000000000000000001");
            });
            
            it('should have the Facebook id', function(){
                expect(this.friend.fbId).toBe(1);
            });
            
            it('should have the name', function(){
                expect(this.friend.name).toBe('user1');
            });
            
            it('should have the distance', function(){
                var distance = {'name': 'dist', 'description': 'desc'};
                expect(this.friend.distance).toEqual(distance);
            });
            
            it('should have the time', function(){
                expect(this.friend.time).toBe(5);
            });
            
            it('should have isFavorite', function(){
                expect(this.friend.isFavorite).toBe('');
            });
        });
        
        describe('with offline friends', function(){
            beforeEach(function(){
                this.friend = this.friends.offlineFriends[0];
            });
            
            it('should have the user id', function(){
                expect(this.friend.friendId).toBe("000000000000000000000005");
            });
            
            it('should have the Facebook id', function(){
                expect(this.friend.fbId).toBe(5);
            });
            
            it('should have the name', function(){
                expect(this.friend.name).toBe('user5');
            });
            
            it('should have isFavorite', function(){
                expect(this.friend.isFavorite).toBe(true);
            });
        });
    });
});
