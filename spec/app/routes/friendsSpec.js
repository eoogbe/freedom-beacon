describe('friends', function(){
    var copy = require('../../../lib/copy').copy;
    
    var helper = require('../spec-helper');
    var response;
    
    var friends = require('../../../routes/friends');
    
    beforeEach(function(){
        response = copy(helper.response);
    });
    
    describe('index()', function(){
        var data;
        
        beforeEach(function(){
            data = require('../../../data.json');
        });
        
        it('should render the friends-index view', function(){
            friends.index({}, response);
            expect(response.view).toBe('friends-index');
        });
        
        xit('should add the friends\' distance', function(){  // call populate
            data.friends = [
                {
                    'name': 'friend1',
                    'distanceId': 0
                },
                {
                    'name': 'friend2',
                    'distanceId': 1
                },
                {
                    'name': 'friend3',
                    'distanceId': 2
                },
                {
                    'name': 'friend4',
                    'distanceId': 3
                },
                {
                    'name': 'friend5',
                    'distanceId': 4
                }
            ];
            
            friends.index({}, response);
            
            var friendsData = response.data.freeFriends;
            
            expect(friendsData[0].distance.name).toBe('shouting distance');
            expect(friendsData[1].distance.name).toBe('walking distance');
            expect(friendsData[2].distance.name).toBe('biking distance');
            expect(friendsData[3].distance.name).toBe('driving distance');
            expect(friendsData[4].distance.name).toBe('calling distance');
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
                var data = require('../../../data.json');
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
                var data = require('../../../data.json');
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
