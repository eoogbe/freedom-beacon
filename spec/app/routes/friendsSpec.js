describe('friends', function(){
    var copy = require('../../../lib/copy').copy;
    
    var helper = require('../spec-helper');
    var response;
    
    var friends = require('../../../routes/friends');
    
    var mongoose = require('mongoose');
    
    require('../../../models/User');
    var User = mongoose.model('User');
    
    beforeEach(function(){
        response = copy(helper.response);
    });

    describe('create', function() {
        var friendRequests;
        var potentialFriend;

        beforeEach(function() {
            request = {'session': {'userId': helper.ids.user0}};
            
            friend = {
                'name': 'friend1',
                'id': '24'
            };
        });

    
        it('should render friends create view', function(){
            var query = jasmine.createSpyObj('query', ['populate', 'exec']);
            query.populate.andReturn(query);
            query.exec.andCallFake(function(done){
                var user = {
                    'friendRequests': []
                };
                done(null, user);
            });
            spyOn(User, 'findById').andReturn(query);
            friends.create(request, response);




            expect(response.view).toBe('friends-create');
        });


    });
    
    describe('index()', function(){
        var request;
        var friend;
        var query;
        
        beforeEach(function(){
            request = {'session': {'userId': helper.ids.user0}};
            
            friend =
            {
                'name': 'friend1',
                'username': 'uname',
                'beacon': {'duration': 5},
                'distance': {'name': 'dist', 'description': 'desc'}
            };
            
            query = jasmine.createSpyObj('query', ['populate', 'exec']);
            query.populate.andReturn(query);
            query.exec.andCallFake(function(fn){
                fn(null, {'friends': [friend]});
            });
            
            spyOn(User, 'findById').andReturn(query);
        });
        
        it('should render the friends-index view', function(){
            friend.isFree = function(){return true;};
            friends.index(request, response);
            expect(response.view).toBe('friends-index');
        });
        
        it('should populate the friends\' distances', function(){
            friend.isFree = function(){return true;};
            friends.index(request, response);
            expect(query.populate).toHaveBeenCalledWith('distance');
        });
        
        it('should retrieve the free friends', function(){
            friend.isFree = function(){return true;};
            
            friends.index(request, response);
            
            var freeFriends = [
                {
                    'name': 'friend1',
                    'username': 'uname',
                    'distance': {'name': 'dist', 'description': 'desc'},
                    'time': 5
                }
            ];
            
            expect(query.populate).toHaveBeenCalledWith('friends');
            expect(response.data.freeFriends).toEqual(freeFriends);
        });
        
        it('should ignore offline friends', function(){
            friend.isFree = function(){return false;};
            friends.index(request, response);
            expect(response.data.freeFriends.length).toBe(0);
        });
    });
    
    describe('search()', function(){
        describe('when no search value', function(){
            it('should not render the search results', function(){
                var request = { 'query': { } };
                
                friends.search(request, response);
                
                expect(response.data.searchResults).toEqual([]);
                expect(response.data.hasSearched).toBe(false);
            });
            
            it('should render the friends-search view', function(){
                var request = { 'query': { } };
                friends.search(request, response);
                expect(response.view).toBe('friends-search');
            });
        });
        
        describe('when search value', function(){
            beforeEach(function(){
                spyOn(User, 'find').andReturn({
                    'exec': function(done) {
                        done(null, [{'name': 'friend1'}]);
                    }
                });
            });
            
            it('should render the search results', function(){
                var request = { 'query': { 'friends-search': 'friend' } };
                
                friends.search(request, response);
                
                var conditions = {'name': new RegExp('friend', 'i')};
                expect(User.find).toHaveBeenCalledWith(conditions);
                
                expect(response.data.searchResults).toEqual([{'name': 'friend1'}]);
                expect(response.data.hasSearched).toBe(true);
            });
            
            it('should remove special characters from the search', function(){
                var request =
                {
                    'query': { 'friends-search': '.\\[^$()?:*=!|{}/,friend' }
                };
                
                friends.search(request, response);
                
                var conditions = {'name': new RegExp('friend', 'i')};
                expect(User.find).toHaveBeenCalledWith(conditions);
            });
            
            it('should render the friends-search view', function(){
                var request = { 'query': { 'friends-search': 'friend' } };
                friends.search(request, response);
                expect(response.view).toBe('friends-search');
            });
        });
        
        describe('when search value not found', function(){
            var request;
            
            beforeEach(function(){
                spyOn(User, 'find').andReturn({
                    'exec': function(done) {
                        done(null, []);
                    }
                });
                
                request = { 'query': { 'friends-search': 'friend1' } };
            });
            
            it('should render the message', function(){
                friends.search(request, response);
                
                expect(response.data.searchResults).toEqual([]);
                expect(response.data.hasSearched).toBe(true);
            });
            
            it('should render the friends-search view', function(){
                friends.search(request, response);
                expect(response.view).toBe('friends-search');
            });
        });
    });
});
