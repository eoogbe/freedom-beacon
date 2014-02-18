describe('beacons', function(){
    describe('create()', function(){
        var copy = require('../../../lib/copy').copy;
        
        var helper = require('../spec-helper');
        var response;
        
        var data = require('../../../data.json');
        var beacons = require('../../../routes/beacons');
        
        beforeEach(function(){
            response = copy(helper.response);
        });
        
        it('should render the beacons-create view', function(){
            beacons.create({}, response);
            expect(response.view).toBe('beacons-create');
        });
        
        it('should filter out non-pinging friends', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'statusId': 0
                },
                {
                    'name': 'friend2',
                    'statusId': 1
                }
            ];
            
            beacons.create({}, response);
            
            var pingingFriends = response.data.pingingFriends;
            expect(pingingFriends.length).toBe(1);
        });
        
        it('should add the friend url to the pinging friends', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'distanceId': 0,
                    'statusId': 0
                },
                {
                    'name': 'friend2',
                    'distanceId': 0,
                    'statusId': 0
                }
            ];
            
            beacons.create({}, response);
            
            var pingingFriends = response.data.pingingFriends;
            
            expect(pingingFriends[0].url).toBe('/conversations/0');
            expect(pingingFriends[1].url).toBe('/conversations/1');
        });
        
        it('should add the distance to the pinging friends', function(){
            data.friends = [
                {
                    'name': 'friend1',
                    'distanceId': 0,
                    'statusId': 0
                },
                {
                    'name': 'friend2',
                    'distanceId': 1,
                    'statusId': 0
                },
                {
                    'name': 'friend3',
                    'distanceId': 2,
                    'statusId': 0
                },
                {
                    'name': 'friend4',
                    'distanceId': 3,
                    'statusId': 0
                },
                {
                    'name': 'friend5',
                    'distanceId': 4,
                    'statusId': 0
                }
            ];
            
            beacons.create({}, response);
            
            var pingingFriends = response.data.pingingFriends;
            
            expect(pingingFriends[0].distance.name).toBe('shouting distance');
            expect(pingingFriends[1].distance.name).toBe('walking distance');
            expect(pingingFriends[2].distance.name).toBe('biking distance');
            expect(pingingFriends[3].distance.name).toBe('driving distance');
            expect(pingingFriends[4].distance.name).toBe('calling distance');
        });
        
        it('should not use the back button', function(){
            beacons.create({}, response);
            expect(response.data.noBack).toBe('no-back');
        });
    });
});