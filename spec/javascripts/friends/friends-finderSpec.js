describe('FriendData', function(){
    describe('findFriends()', function(){
        beforeEach(function(){
            var fbFriends,
                threads,
                users,
                friendsFinder;
            
            fbFriends = [
                {'id': 1, 'username': 'uname1'},
                {'id': 2, 'username': 'uname2'},
                {'id': 3, 'username': 'uname3'},
                {'id': 5, 'username': 'uname5'},
                {'id': 6, 'username': 'uname6'}
            ];
            
            threads = [
                {
                    'id': 10,
                    'participants': [{'id': 0}, {'id': 1}]
                },
                {
                    'id': 11,
                    'participants': [{'id': 0}, {'id': 5}]
                },
                {
                    'id': 12,
                    'participants': [{'id': 0}, {'id': 6}]
                }
            ];
            
            users = getJSONFixture('users.json').users;
            
            friendsFinder = FREE.FriendsFinder;
            friendsFinder.init(users, threads, fbFriends);
            
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
                expect(this.friend.friendId).toBe(1);
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
                expect(this.friend.isFavorite).toBe(false);
            });
            
            describe('when has thread', function(){
                it('should have a thread url', function(){
                    var url = 'https://m.facebook.com/messages/read/?tid=10';
                    expect(this.friend.url).toBe(url);
                });
            });
            
            describe('when doesn\'t have thread', function(){
                it('should have the messages url', function(){
                    var friend,
                        url;
                    
                    friend = this.friends.freeFriends[0];
                    url = 'https://facebook.com/messages/uname2';
                    
                    expect(friend.url).toBe(url);
                });
            });
        });
        
        describe('with offline friends', function(){
            beforeEach(function(){
                this.friend = this.friends.offlineFriends[0];
            });
            
            it('should have the user id', function(){
                expect(this.friend.friendId).toBe(5);
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
