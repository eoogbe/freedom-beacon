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
            beacons.create(request, response);
            expect(User.findById).toHaveBeenCalledWith(helper.ids.user0);
        });
        
        it('should render the beacons-create view', function(){
            beacons.create(request, response);
            expect(response.view).toBe('beacons-create');
        });
        
        it('should be the experiment page', function(){
            beacons.create(request, response);
            expect(response.data.isExperiment).toBe(true);
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
            
            it('should set the timer value to the minutes and the seconds', function(){
                expect(response.data.timerValue).toBe('5:00');
            });
        });
    });
    
    describe('createB()', function(){
        beforeEach(function(){
            var user =
            {
                'fbId': 0,
                'getTimeLeft': function(){return 0;}
            };
            
            spyOn(User, 'findById').andReturn({
                'exec': function(done) {
                    done(null, user);
                }
            });
            
            beacons.createB(request, response);
        });
        
        it('should set isB', function(){
            expect(response.data.isB).toBe(true);
        });
        
        it('should be the experiment page', function(){
            expect(response.data.isExperiment).toBe(true);
        });
    });
    
    describe('createC()', function(){
        beforeEach(function(){
            var user =
            {
                'fbId': 0,
                'getTimeLeft': function(){return 5;}
            };
            
            spyOn(User, 'findById').andReturn({
                'exec': function(done) {
                    done(null, user);
                }
            });
            
            beacons.createC(request, response);
        });
        
        it('should set altC', function(){
            expect(response.data.altC).toBe('alt-c');
        });
        
        it('should set the timer value to just the minutes', function(){
            expect(response.data.timerValue).toBe(5);
        });
        
        it('should be the experiment page', function(){
            expect(response.data.isExperiment).toBe(true);
        });
    });
    
    describe('post()', function(){
        var user;
        
        beforeEach(function(){
            request.body = {'main-beacon': '15'};
            
            user = jasmine.createSpyObj('user', ['save', 'markModified']);
            user.beacon = {'timeSet': null, 'duration': 0};
            user.save.andCallFake(function(done){
                done();
            });
            
            spyOn(User, 'findById').andReturn({
                'exec': function(done) {
                    done(null, user);
                }
            });
            
            spyOn(Date, 'now').andReturn(120000);
        });
        
        it('should update the beacon in the database to the current time', function(){
            beacons.post(request, response);
            
            expect(user.markModified).toHaveBeenCalledWith('beacon');
            expect(user.save).toHaveBeenCalled();
            expect(user.beacon.timeSet.getTime()).toBe(120000)
            expect(user.beacon.duration).toBe('15');
        });
        
        it('should redirect back to the beacons-create page', function(){
            beacons.post(request, response);
            expect(response.path).toBe('/beacons/create');
        });
        
        describe('when the beacon duration is invalid', function(){
            beforeEach(function(){
                request.body = {'main-beacon': '150'};
                
                user.save.andCallFake(function(done){
                    done('error');
                });
                
                beacons.post(request, response);
            });
            
            it('should render the beacons-create page', function(){
                expect(response.view).toBe('beacons-create');
            });
            
            it('should add the error', function(){
                expect(response.data.error).toBeDefined();
            });
            
            it('should set isDeactivated to true', function(){
                expect(response.data.isDeactivated).toBe(true);
            });
            
            it('should set the timer value to empty', function(){
                expect(response.data.timerValue).toBe('');
            });
        });
        
        describe('when beacon illuminated', function(){
            it('should simulate zeroing the duration', function(){
                request.body = {};
                
                beacons.post(request, response);
                
                expect(user.beacon.timeSet.getTime()).toBe(60000);
                expect(user.beacon.duration).toBe(1);
            });
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
    
    describe('show()', function(){
        it('should send the current user\'s beacon as a JSON object', function(){
            spyOn(User, 'findById').andReturn({
                'exec': function(done) {
                    var user =
                    {
                        'beacon': {'timeSet': new Date(5), 'duration': '2'}
                    };
                    
                    done(null, user);
                }
            });
            
            beacons.show(request, response);
            
            expect(response.data).toEqual({'timeSet': new Date(5), 'duration': '2'});
        });
    });
});
