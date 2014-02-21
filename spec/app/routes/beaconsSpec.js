describe('beacons', function(){
    describe('create()', function(){
        var copy = require('../../../lib/copy').copy;
        
        var helper = require('../spec-helper');
        var response;
        
        var beacons = require('../../../routes/beacons');
        
        beforeEach(function(){
            response = copy(helper.response);
        });
        
        it('should render the beacons-create view', function(){
            beacons.create({}, response);
            expect(response.view).toBe('beacons-create');
        });
        
        it('should make the back button and header timer invisibile', function(){
            beacons.create({}, response);
            expect(response.data.mainBeaconVisibility).toBe('invisible');
        });
    });
    
    describe('post()', function(){
        
    });
});