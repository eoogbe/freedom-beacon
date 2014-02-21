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
        var friend;
        var query;
        
        beforeEach(function(){    
            friend =
            {
                'name': 'friend1',
                'username': 'uname',
                'beacon': {'duration': 5},
                'distance': {'name': 'dist', 'description': 'desc'}
            };
            
            query = jasmine.createSpyObj('query', ['populate', 'exec']);
            query.populate.andReturn(query);
            query.exec.andCallFake(function(fn){
                fn(null, {'friends': [friend]});
            });
            
            spyOn(User, 'findById').andReturn(query);
        });
        
        it('should render the beacons-create view', function(){
            friend.isFree = function(){return false;};
            beacons.create(request, response);
            expect(response.view).toBe('beacons-create');
        });
        
        it('should make the back button and header timer invisibile', function(){
            friend.isFree = function(){return false;};
            beacons.create(request, response);
            expect(response.data.mainBeaconVisibility).toBe('invisible');
        });
        
        it('should populate the friends\' distances', function(){
            friend.isFree = function(){return true;};
            beacons.create(request, response);
            expect(query.populate).toHaveBeenCalledWith('distance');
        });
        
        it('should retrieve the free friends', function(){
            friend.isFree = function(){return true;};
            
            beacons.create(request, response);
            
            var freeFriends = [
                {
                    'name': 'friend1',
                    'username': 'uname',
                    'distance': {'name': 'dist', 'description': 'desc'},
                    'time': 5
                }
            ];
            
            expect(query.populate).toHaveBeenCalledWith('friends');
            expect(response.data.freeFriends).toEqual(freeFriends);
        });
        
        it('should ignore offline friends', function(){
            friend.isFree = function(){return false;};
            beacons.create(request, response);
            expect(response.data.freeFriends.length).toBe(0);
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
            expect(user.beacon.timeSet).toEqual(new Date(5));
            expect(user.beacon.duration).toBe(15);
        });
        
        it('should redirect back to the beacons-create page', function(){
            beacons.post(request, response);
            expect(response.path).toBe('back');
        });
    });
});