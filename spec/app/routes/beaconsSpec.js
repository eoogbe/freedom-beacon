describe('beacons', function(){
    var copy = require('../../../lib/copy').copy;
    var beacons = require('../../../routes/beacons');
    var helper = require('../spec-helper');
    var mongoose = require('mongoose');
    
    require('../../../models/User');
    var User = mongoose.model('User');
    
    var response;
    var request;
    
    beforeEach(function(){
        request = {'session': {'userId': helper.ids.user0}};
        response = copy(helper.response);
    });
    
    describe('create()', function(){
        beforeEach(function(){    
            spyOn(User, 'findById').andReturn({
                'exec': function(done) {
                    done(null, {'fbId': 0});
                }
            });
        });
        
        it('should find the current user', function(){
            User.findById.andCallFake(function(userId){
                expect(userId).toBe(helper.ids.user0);
                
                return {
                    'exec': function(done) {
                        done(null, {'fbId': 0});
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
        
        it('should add the current user\'s Facebook id', function(){
            beacons.create(request, response);
            expect(response.data.userFbId).toBe(0);
        });
    });
    
    describe('post()', function(){
        var user;
        
        beforeEach(function(){
            request.body = {'mainTimer': 15};
            
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
            expect(user.beacon).toEqual({'timeSet': new Date(5), 'duration': 15});
        });
        
        it('should redirect back to the beacons-create page', function(){
            beacons.post(request, response);
            expect(response.path).toBe('back');
        });
    });
    
    describe('show()', function(){
        var next;
        
        beforeEach(function(){
            next = jasmine.createSpy('next');
            spyOn(User, 'findById').andReturn({
                'exec': function(done) {
                    var user = { 'getTimeLeft': function() {return 1;} };
                    done(null, user);
                }
            })
        });
        
        it('should set response.locals.userTime to the minutes left for the current user', function(){
            beacons.show(request, response, next);
            expect(response.locals.userTime).toBe(1);
        });
        
        it('should call next', function(){
            beacons.show(request, response, next);
            expect(next).toHaveBeenCalled();
        });
    });
});