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

    describe('create()', function() {
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
    
    describe('search()', function(){
        describe('when no search value', function(){
            it('should not render the search results', function(){
                var request = { 'query': { } };
                
                friends.search(request, response);
                
                expect(response.data.haveNotRequested).toEqual([]);
                expect(response.data.haveRequested).toEqual([]);
                expect(response.data.hasSearched).toBe(false);
            });
            
            it('should render the friends-search view', function(){
                var request = { 'query': { } };
                friends.search(request, response);
                expect(response.view).toBe('friends-search');
            });
        });
        
        describe('when search value', function(){
            var fakeResults;

            beforeEach(function(){
                var ObjectId = mongoose.Types.ObjectId
                var query = jasmine.createSpyObj('query', ['populate', 'exec']);

                query.populate.andReturn(query);
                query.exec.andCallFake(function(fn){
                    fakeResults = [{'_id': new ObjectId(helper.ids.user2), 'friendRequests': [], 'name': 'friend1'}];
                    fn(null, fakeResults)
                });

                spyOn(User, 'find').andReturn(query);

                spyOn(User, 'findById').andReturn({
                    'exec': function(done) {
                        var userFound = {'friends': [helper.ids.user1]}
                        done(null, userFound);
                    }
                });
            });
            
            it('should render the search results', function(){
                var request = { 'query': { 'friends-search': 'friend' },
                                'session': {'userId':helper.ids.user0}
                                 };
                
                friends.search(request, response);
                
                var conditions = {'name': new RegExp('friend', 'i')};
                expect(User.find).toHaveBeenCalledWith(conditions);
                
                expect(response.data.haveNotRequested).toEqual(fakeResults);
                expect(response.data.hasSearched).toBe(true);
            });
            
            it('should remove special characters from the search', function(){
                var request =
                {
                    'query': { 'friends-search': '.\\[^$()?:*=!|{}/,friend' },
                    'session': {'userId':helper.ids.user0}
                };
                
                friends.search(request, response);
                
                var conditions = {'name': new RegExp('friend', 'i')};
                expect(User.find).toHaveBeenCalledWith(conditions);
            });
            
            it('should render the friends-search view', function(){
                var request = { 
                    'query': { 'friends-search': 'friend' },
                    'session': {'userId':helper.ids.user0}
                     };
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
            
            xit('should render the message', function(){
                friends.search(request, response);
                
                expect(response.data.searchResults).toEqual([]);
                expect(response.data.hasSearched).toBe(true);
            });
            
            xit('should render the friends-search view', function(){
                friends.search(request, response);
                expect(response.view).toBe('friends-search');
            });
        });
    });
});