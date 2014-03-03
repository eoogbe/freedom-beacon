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
            favorites.post(request, response);
        });
        
        it('should get the current user', function(){
            expect(User.findById).toHaveBeenCalledWith(helper.ids.user0);
        });
        
        it('should add a favorite', function(){
            expect(user.favorites.length).toBe(1);
            expect(user.favorites[0]).toEqual(helper.ids.user1);
        });
        
        it('should save the user', function(){
            expect(user.save).toHaveBeenCalled();
        });
        
        it('should render the favorite-button partial', function(){
            expect(response.view).toBe('partials/favorite-button');
        });
        
        it('should not render the layout', function(){
            expect(response.data.layout).toBe(false);
        });
        
        it('should set isFavorite to be true', function(){
            expect(response.data.isFavorite).toBe(true);
        });
    });
    
    describe('delete()', function(){
        beforeEach(function(){
            user.favorites = [helper.ids.user1, helper.ids.user2];
            favorites.delete(request, response);
        });
        
        it('should get the current user', function(){
            expect(User.findById).toHaveBeenCalledWith(helper.ids.user0);
        });
        
        it('should remove a favorite from the current user', function(){
            expect(user.favorites.length).toBe(1);
            expect(user.favorites[0]).toEqual(helper.ids.user2);
        });
        
        it('should save the user', function(){
            expect(user.save).toHaveBeenCalled();
        });
        
        it('should render the favorite-button partial', function(){
            expect(response.view).toBe('partials/favorite-button');
        });
        
        it('should not render the layout', function(){
            expect(response.data.layout).toBe(false);
        });
        
        it('should set isFavorite to be false', function(){
            expect(response.data.isFavorite).toBe(false);
        });
    });
});
