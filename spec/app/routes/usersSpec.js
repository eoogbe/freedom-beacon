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
        
        beforeEach(function(){
            request =
            {
                'query': {'requestor': 'jquery'},
                'session': {'userId': helper.ids.user0}
            };
            
            response = copy(helper.response);
            
            spyOn(User, 'findById').andReturn({
                'exec': function(done){
                    var user =
                    {
                        'favorites': [helper.ids.user2, helper.ids.user3]
                    };
                    
                    return done(null, user);
                }
            });
            
            usersData = [
                {
                    '_id': helper.ids.user1,
                    'name': 'user1',
                    'fbId': 1,
                    'distance': {'name': 'dist', 'description': 'desc'},
                    'timeLeft': function() {return 8; },
                    'isFree': function() {return true;}
                },
                {
                    '_id': helper.ids.user2,
                    'name': 'user2',
                    'fbId': 2,
                    'distance': {'name': 'dist2', 'description': 'desc2'},
                    'timeLeft': function() {return 5; },
                    'isFree': function() {return true;}
                },
                {
                    '_id': helper.ids.user3,
                    'name': 'user3',
                    'fbId': 3,
                    'isFree': function() {return false;}
                },
                {
                    '_id': helper.ids.user4,
                    'name': 'user4',
                    'fbId': 4,
                    'isFree': function() {return false;}
                }
            ];
            
            spyOn(User, 'find').andCallFake(function(conditions, done){
                done(null, usersData);
            });
        });
        
        it('should find the current user\'s favorites', function(){
            User.findById.andCallFake(function(userId){
                expect(userId).toBe(helper.ids.user0);
                
                return {
                    'exec': function(done){
                        var user =
                        {
                            'favorites': [helper.ids.user2, helper.ids.user3]
                        };
                        
                        return done(null, user);
                    }
                };
            });
        });
        
        it('should find all the users', function(){
            User.find.andCallFake(function(conditions, done){
                expect(conditions).toEqual({});
                done(null, usersData);
            });
            
            users.index(request, response);
            
            expect(User.find).toHaveBeenCalled();
        });
        
        it('should send all the users as a JSON object', function(){
            spyOn(response, 'json').andCallThrough();
            
            users.index(request, response);
            
            expect(response.json).toHaveBeenCalled();
            expect(response.data.users.length).toBe(4);
            
        });
        
        it('should send free users', function(){
            users.index(request, response);
            
            var usersJson = response.data.users;
            expect(usersJson[0].name).toBe('user1');
            expect(usersJson[0].fbId).toBe(1);
            expect(usersJson[0].distance).toEqual({'name': 'dist', 'description': 'desc'});
            expect(usersJson[0].time).toBe(8);
            expect(usersJson[0].isFree).toBe(true);
            expect(usersJson[0].isFavorite).toBe(false);
            
            expect(usersJson[1].name).toBe('user2');
            expect(usersJson[1].fbId).toBe(2);
            expect(usersJson[1].distance).toEqual({'name': 'dist2', 'description': 'desc2'});
            expect(usersJson[1].time).toBe(5);
            expect(usersJson[1].isFree).toBe(true);
            expect(usersJson[1].isFavorite).toBe(true);
        });
        
        it('should send offline users', function(){
            users.index(request, response);
            
            var usersJson = response.data.users;
            expect(usersJson[2].name).toBe('user3');
            expect(usersJson[2].fbId).toBe(3);
            expect(usersJson[2].isFree).toBe(false);
            expect(usersJson[2].isFavorite).toBe(true);
            
            expect(usersJson[3].name).toBe('user4');
            expect(usersJson[3].fbId).toBe(4);
            expect(usersJson[3].isFree).toBe(false);
            expect(usersJson[3].isFavorite).toBe(false);
        });
        
        it('should check the requestor', function(){
            request =
            {
                'query': {},
                'session': {'userId': helper.ids.user0}
            };
            
            users.index(request, response);
            
            expect(response.path).toBe('/');
        });
    });
});
