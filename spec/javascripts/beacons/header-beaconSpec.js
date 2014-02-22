describe('HeaderBeacon', function(){
    describe('init()', function(){
        beforeEach(function(){
            loadFixtures('beacons/header-beacon.html');
            FREE.HeaderBeacon.init($('form[name="header-timer-form"]'));
        });
        
        it('should add the beacon button', function(){
            expect($('.header-beacon')).toExist();
        });
        
        it('should add a click handler to the beacon button', function(){
            spyOn(jQuery, 'post').and.callFake(function(path, data, done){ 
                done();
            });
            
            $('.header-beacon').click();
            
            expect($('.header-beacon')).not.toExist();
            expect($('input[name="header-timer"]')).toExist();
        });
        
        it('should add a submit handler to the parent', function(){
            spyOn(FREE.HeaderTimer, 'init');
            spyOn(FREE.HeaderTimer, 'run');
            
            spyOn(jQuery, 'post').and.callFake(function(path, data, done){
                expect(path).toBe('/beacons');
                expect(data).toEqual({'mainTimer': '30'});
                
                done();
            });
            
            $('.header-beacon').click();
            $('form[name="header-timer-form"]').submit();
            
            expect($('input[name="header-timer-btn"]')).toExist();
            expect(FREE.HeaderTimer.init).toHaveBeenCalled();
            expect(FREE.HeaderTimer.run).toHaveBeenCalled();
        });
    });
});
