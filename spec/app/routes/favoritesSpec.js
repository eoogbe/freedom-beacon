describe('favorites', function(){
    var copy = require('../../../lib/copy').copy;
    var helper = require('../spec-helper');
    var favorites = require('../../../routes/favorites');
    var mongoose = require('mongoose');
    
    require('../../../models/User');
    var User = mongoose.model('User');
    
    var request;
    var response;
    
    var user;
    
    beforeEach(function(){
        request =
        {
            'session': {'userId': helper.ids.user0},
            'body': {'friendId': helper.ids.user1}
        };
        
        response = copy(helper.response);
        
        user = jasmine.createSpyObj('user', ['save']);
        user.save.andCallFake(function(done){
            done();
        });
        
        spyOn(User, 'findById').andReturn({
            'exec': function(done) {
                done(null, user);
            }
        });
    });
    
    describe('post()', function(){
        beforeEach(function(){
            user.favorites = [];
        });
        
        it('should get the current user', function(){
            User.findById.andCallFake(function(id){
                expect(id).toBe(helper.ids.user0);
                
                return {
                    'exec': function(done) {
                        done(null, user);
                    }
                };
            });
            
            favorites.post(request, response);
            
            expect(User.findById).toHaveBeenCalled();
        });
        
        it('should add a favorite', function(){
            favorites.post(request, response);
            
            expect(user.favorites.length).toBe(1);
            expect(user.favorites[0]).toEqual(helper.ids.user1);
        });
        
        it('should save the user', function(){
            favorites.post(request, response);
            expect(user.save).toHaveBeenCalled();
        });
        
        it('should send a 200 status', function(){
            favorites.post(request, response);
            expect(response.sent).toBe(200);
        });
    });
    
    describe('delete()', function(){
        beforeEach(function(){
            user.favorites = [helper.ids.user1, helper.ids.user2];
        });
        
        it('should get the current user', function(){
            User.findById.andCallFake(function(id){
                expect(id).toBe(helper.ids.user0);
                
                return {
                    'exec': function(done) {
                        done(null, user);
                    }
                };
            });
            
            favorites.delete(request, response);
            
            expect(User.findById).toHaveBeenCalled();
        });
        
        it('should remove a favorite from the current user', function(){
            favorites.delete(request, response);
            
            expect(user.favorites.length).toBe(1);
            expect(user.favorites[0]).toEqual(helper.ids.user2);
        });
        
        it('should save the user', function(){
            favorites.delete(request, response);
            expect(user.save).toHaveBeenCalled();
        });
        
        it('should send a 200 status', function(){
            favorites.delete(request, response);
            expect(response.sent).toBe(200);
        });
    });
});
