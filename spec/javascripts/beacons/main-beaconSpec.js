describe('MainBeacon', function(){
    describe('run()', function(){
        describe('when illuminated', function(){
            var mainBeacon;
            
            beforeEach(function(){
                loadFixtures('beacons/illuminated-main-beacon.html');
                
                mainBeacon = FREE.MainBeacon
                mainBeacon.init();
            });
            
            it('should start a countdown', function(){
                spyOn(FREE.Countdowner, 'countdown');
                mainBeacon.run();
                expect(FREE.Countdowner.countdown).toHaveBeenCalled();
            });
            
            describe('when the countdown ends', function(){
                it('should tell the server', function(){
                    spyOn(FREE.Countdowner, 'countdown').and.callFake(function($timer, done){
                        done();
                    });
                    
                    spyOn(jQuery, 'post').and.callFake(function(path){
                        expect(path).toBe('/beacons/delete');
                    });
                    
                    mainBeacon.run();
                    
                    expect(jQuery.post).toHaveBeenCalled();
                });
            });
        })
        
        describe('when deactivate', function(){
            it('should not start a countdown', function(){
                loadFixtures('beacons/deactivated-main-beacon.html');
                spyOn(FREE.Countdowner, 'countdown');
                    
                var mainBeacon = FREE.MainBeacon
                mainBeacon.init();
                mainBeacon.run();
                
                expect(FREE.Countdowner.countdown).not.toHaveBeenCalled();
            });
        })
    });
});