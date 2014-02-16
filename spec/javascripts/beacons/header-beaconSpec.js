describe('HeaderBeacon', function(){
    describe('init()', function(){
        beforeEach(function(){
            loadFixtures('beacons/header-beacon.html');
            FREE.HeaderBeacon.init($('.header-beacon-holder'));
        });
        
        it('should add the beacon button', function(){
            expect($('.header-beacon')).toExist();
        });
        
        it('should add a click handler to the beacon button', function(){
            $('.header-beacon').click();
            
            expect($('.header-beacon')).not.toExist();
            expect($('input[name="header-timer"]')).toExist();
        });
    });
});
