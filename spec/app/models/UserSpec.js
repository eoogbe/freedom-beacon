describe('User', function(){
    var helper = require('../spec-helper');
    var mongoose = require('mongoose');
    
    require('../../../models/User');
    var User = mongoose.model('User');
    
    describe('isFree()', function(){
        var user;
        
        beforeEach(function(){
            user = new User({
                'beacon': {'timeSet': new Date(1000), 'duration': 5}
            });
        });
        
        it('should return true when the timeSet and duration has not passed', function(){
            spyOn(Date, 'now').andReturn(2000);
            expect(user.isFree()).toBe(true);
        });
        
        it('should return false when the timeSet and duration has passed', function(){
            spyOn(Date, 'now').andReturn(10 * 60000);
            expect(user.isFree()).toBe(false);
        });
    });
});