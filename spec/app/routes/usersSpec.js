describe('users', function(){
    describe('index()', function(){
        var copy = require('../../../lib/copy').copy;
        var helper = require('../spec-helper');
        var users = require('../../../routes/users');
        var mongoose = require('mongoose');
        
        require('../../../models/User');
        var User = mongoose.model('User');
        
        var request;
        var response;
        var usersData;
        var query;
        
        beforeEach(function(){
            request = {'query': {'requestor': 'jquery'}};
            response = copy(helper.response);
            
            usersData = [
                {
                    'name': 'user1',
                    'fbId': 1,
                    'distance': {'name': 'dist', 'description': 'desc'},
                    'timeLeft': function() {return 5; },
                    'isFree': function() {return true;}
                },
                {
                    'name': 'user2',
                    'fbId': 2,
                    'isFree': function() {return false;}
                }
            ];
            
            query = jasmine.createSpyObj('query', ['populate', 'exec']);
            query.populate.andReturn(query);
            query.exec.andCallFake(function(done) {
                done(null, usersData);
            });
            
            spyOn(User, 'find').andReturn(query);
        });
        
        it('should find all the users', function(){
            User.find.andCallFake(function(conditions){
                expect(conditions).toEqual({});  
                return query;
            });
            
            query.exec.andCallFake(function(done){
                expect(typeof done).toBe('function');
                done(null, usersData);
            });
            
            users.index(request, response);
            
            expect(User.find).toHaveBeenCalled();
            expect(query.populate).toHaveBeenCalled();
            expect(query.exec).toHaveBeenCalled();
        });
        
        it('should send all the users as a JSON object', function(){
            spyOn(response, 'json').andCallThrough();
            
            users.index(request, response);
            
            expect(response.json).toHaveBeenCalled();
            expect(response.data.users.length).toBe(2);
            
        });
        
        it('should send free users', function(){
            users.index(request, response);
            
            var usersJson = response.data.users;
            expect(usersJson[0].name).toBe('user1');
            expect(usersJson[0].fbId).toBe(1);
            expect(usersJson[0].distance).toEqual({'name': 'dist', 'description': 'desc'});
            expect(usersJson[0].time).toBe(5);
            expect(usersJson[0].isFree).toBe(true);
        });
        
        it('should send offline users', function(){
            users.index(request, response);
            
            var usersJson = response.data.users;
            expect(usersJson[1].name).toBe('user2');
            expect(usersJson[1].fbId).toBe(2);
            expect(usersJson[1].isFree).toBe(false);
        });
        
        it('should check the requestor', function(){
            request = {'query': {}};
            users.index(request, response);
            expect(response.path).toBe('/');
        });
    });
});
