describe('beacons', function(){
    var copy,
        helper,
        beacons,
        mongoose,
        User,
        request,
        response;
    
    copy = require('../../../lib/copy').copy;
    helper = require('../spec-helper');
    beacons = require('../../../routes/beacons');
    mongoose = require('mongoose');
    
    require('../../../models/User');
    User = mongoose.model('User');
    
    beforeEach(function(){
        request = {'session': {'userId': helper.ids.user0}};
        response = copy(helper.response);
    });
    
    describe('create()', function(){
        var user;
        
        beforeEach(function(){
            user =
            {
                'fbId': 0,
                'getTimeLeft': function(){return 0;}
            };
            
            spyOn(User, 'findById').andReturn({
                'exec': function(done) {
                    done(null, user);
                }
            });
        });
        
        it('should find the current user', function(){
            User.findById.andCallFake(function(userId){
                expect(userId).toBe(helper.ids.user0);
                
                return {
                    'exec': function(done) {
                        done(null, user);
                    }
                };
            });
            
            beacons.create(request, response);
            expect(User.findById).toHaveBeenCalled();
        });
        
        it('should render the beacons-create view', function(){
            beacons.create(request, response);
            expect(response.view).toBe('beacons-create');
        });
        
        describe('when no time left', function(){
            beforeEach(function(){
                beacons.create(request, response);
            });
            
            it('should set isDeactivated to true', function(){
                expect(response.data.isDeactivated).toBe(true);
            });
            
            it('should set the timer value to 30', function(){
                expect(response.data.timerValue).toBe('30');
            });
        });
        
        describe('when time left', function(){
            beforeEach(function(){
                user.getTimeLeft = function() { return 5; };
                
                User.findById.andReturn({
                    'exec': function(done) {
                        done(null, user);
                    }
                });
                
                beacons.create(request, response);
            });
            
            it('should set isDeactivated to false', function(){
                expect(response.data.isDeactivated).toBe(false);
            });
            
            it('should set the user time to the time left', function(){
                expect(response.data.userTime).toBe(5);
            });
        });
    });
    
    describe('post()', function(){
        var user;
        
        beforeEach(function(){
            request.body = {'main-timer': 15};
            
            user = jasmine.createSpyObj('user', ['save']);
            user.beacon = {'timeSet': null, 'duration': 0};
            user.save.andCallFake(function(done){
                done();
            });
            
            spyOn(User, 'findById').andReturn({
                'exec': function(done) {
                    done(null, user);
                }
            });
            
            spyOn(Date, 'now').andReturn(5);
        });
        
        it('should update the beacon in the database to the current time', function(){
            beacons.post(request, response);
            
            expect(user.save).toHaveBeenCalled();
            expect(user.beaconTimeSet).toEqual(new Date(5))
            expect(user.beaconDuration).toBe(15);
        });
        
        it('should redirect back to the beacons-create page', function(){
            beacons.post(request, response);
            expect(response.path).toBe('/beacons/create');
        });
    });
    
    describe('delete()', function(){
        beforeEach(function(){
            beacons.delete({}, response);
        });
        
        it('should render the main-beacon partial', function(){
            expect(response.view).toBe('partials/main-beacon');
        });
        
        it('should not render the layout', function(){
            expect(response.data.layout).toBe(false);
        });
        
        it('should set the timerValue to 0', function(){
            expect(response.data.timerValue).toBe('0');
        });
    });
});