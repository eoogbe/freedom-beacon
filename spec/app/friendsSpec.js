describe('friends', function(){
    var copy = require('../../lib/copy').copy;
    
    var helper = require('./spec-helper');
    var response;
    
    var friends = require('../../routes/friends');
    
    beforeEach(function(){
        response = copy(helper.response);
    });
    
    describe('index()', function(){
        var data;
        
        beforeEach(function(){
            data = require('../../data.json');
        });
        
        it('should render the friends-index view', function(){
            friends.index({}, response);
            expect(response.view).toBe('friends-index');
        });
        
        it('should split the friends into 3 categories: pinging, free, and offline', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'distanceId': 0,
                    'statusId': 0
                },
                {
                    'name': 'friend2',
                    'distanceId': 0,
                    'statusId': 1
                },
                {
                    'name': 'friend3',
                    'distanceId': 0,
                    'statusId': 2
                }
            ];
            
            friends.index({}, response);
            
            var friendsData = response.data.friends;
            
            expect(friendsData.pinging.length).toBe(1);
            expect(friendsData.free.length).toBe(1);
            expect(friendsData.offline.length).toBe(1);
        });
        
        it('should add the friends\' statuses', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'distanceId': 0,
                    'statusId': 0
                },
                {
                    'name': 'friend2',
                    'distanceId': 0,
                    'statusId': 1
                },
                {
                    'name': 'friend3',
                    'distanceId': 0,
                    'statusId': 2
                }
            ];
            
            friends.index({}, response);
            
            var friendsData = response.data.friends;
            
            expect(friendsData.pinging[0].status).toBe('pinging');
            expect(friendsData.free[0].status).toBe('free');
            expect(friendsData.offline[0].status).toBe('offline');
        });
        
        it('should add a friend url', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'distanceId': 0,
                    'statusId': 0
                },
                {
                    'name': 'friend2',
                    'distanceId': 0,
                    'statusId': 0
                },
                {
                    'name': 'friend3',
                    'distanceId': 0,
                    'statusId': 1
                },
                {
                    'name': 'friend4',
                    'distanceId': 0,
                    'statusId': 2
                }
            ];
            
            friends.index({}, response);
            
            var friendsData = response.data.friends;
            
            expect(friendsData.pinging[0].url).toBe('/conversations/0');
            expect(friendsData.pinging[1].url).toBe('/conversations/1');
            expect(friendsData.free[0].url).toBe('#');
            expect(friendsData.offline[0].url).toBe('#');
        });
        
        it('should add the friends\' distance', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'distanceId': 0,
                    'statusId': 0
                },
                {
                    'name': 'friend2',
                    'distanceId': 1,
                    'statusId': 0
                },
                {
                    'name': 'friend3',
                    'distanceId': 2,
                    'statusId': 0
                },
                {
                    'name': 'friend4',
                    'distanceId': 3,
                    'statusId': 1
                },
                {
                    'name': 'friend5',
                    'distanceId': 4,
                    'statusId': 1
                }
            ];
            
            friends.index({}, response);
            
            var friendsData = response.data.friends;
            
            expect(friendsData.pinging[0].distance.name).toBe('shouting distance');
            expect(friendsData.pinging[1].distance.name).toBe('walking distance');
            expect(friendsData.pinging[2].distance.name).toBe('biking distance');
            expect(friendsData.free[0].distance.name).toBe('driving distance');
            expect(friendsData.free[1].distance.name).toBe('calling distance');
        });
        
        it('should not add the friends\' distances to the offline friends', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'statusId': 2
                }
            ];
            
            friends.index({}, response);
            var offlineFriends = response.data.friends.offline;
            expect(offlineFriends[0].distance).toBeUndefined();
        });
        
        it('should add the friends\' times', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'time': 10,
                    'statusId': 0
                },
                {
                    'name': 'friend2',
                    'time': 21,
                    'statusId': 1
                }
            ];
            
            friends.index({}, response);
            
            var friendsData = response.data.friends;
            
            expect(friendsData.pinging[0].time).toBe('10 min left');
            expect(friendsData.free[0].time).toBe('21 min left');
        });
        
        it('should not add the friends\' times to the offline friends', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'statusId': 2
                }
            ];
            
            friends.index({}, response);
            var offlineFriends = response.data.friends.offline;
            expect(offlineFriends[0].time).toBeUndefined();
        });
    });
    
    describe('search()', function(){
        it('should render the friends-search view', function(){
            var request = { 'query': { } };
            friends.search(request, response);
            expect(response.view).toBe('friends-search');
        });
        
        describe('when no search value', function(){
            it('should not render the search results', function(){
                var request = { 'query': { } };
                
                friends.search(request, response);
                
                expect(response.data.searchResults).toEqual([]);
                expect(response.data.hasSearched).toBe(false);
            });
        });
        
        describe('when search value', function(){
            it('should render the search results', function(){
                var data = require('../../data.json');
                data.friends = [
                    {
                        'name': 'friend'
                    },
                    {
                        'name': 'friend2'
                    }
                ];
                
                var request = { 'query': { 'friends-search': 'friend' } };
                
                friends.search(request, response);
                
                expect(response.data.searchResults).toEqual(['friend']);
                expect(response.data.hasSearched).toBe(true);
            });
        });
        
        describe('when search value not found', function(){
            it('should render the message', function(){
                var data = require('../../data.json');
                data.friends = [
                    {
                        'name': 'friend'
                    },
                    {
                        'name': 'friend2'
                    }
                ];
                
                var request = { 'query': { 'friends-search': 'friend3' } };
                
                friends.search(request, response);
                
                expect(response.data.searchResults).toEqual([]);
                expect(response.data.hasSearched).toBe(true);
            });
        });
    });
});