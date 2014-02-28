describe('User', function(){
    var helper = require('../spec-helper');
    var mongoose = require('mongoose');
    
    require('../../../models/User');
    var User = mongoose.model('User');
    
    var user;
    
    beforeEach(function(){
        user = new User({
            'beacon': {'timeSet': new Date(1000), 'duration': '5'}
        });
    });
    
    describe('isFree()', function(){
        it('should return true when the timeSet and duration has not passed', function(){
            spyOn(Date, 'now').andReturn(2000);
            expect(user.isFree()).toBe(true);
        });
        
        it('should return false when the timeSet and duration has passed', function(){
            spyOn(Date, 'now').andReturn(10 * 60000);
            expect(user.isFree()).toBe(false);
        });
    });
    
    describe('getTimeLeft()', function(){
        it('should return the time left until the beacon deactivates', function(){
            spyOn(Date, 'now').andReturn(5 * 60000);
            expect(user.getTimeLeft()).toBe(1);
        });
        
        it('should return no time left if the beacon deactivates now', function(){
            spyOn(Date, 'now').andReturn(6 * 60000);
            expect(user.getTimeLeft()).toBe(0);
        });
    });
});