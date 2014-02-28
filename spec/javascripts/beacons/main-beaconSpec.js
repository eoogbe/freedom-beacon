describe('MainBeacon', function(){
    describe('run()', function(){
        beforeEach(function(){
            this.mainBeacon = FREE.MainBeacon
            this.mainBeacon.init();
        });
        
        describe('when illuminated', function(){
            beforeEach(function(){
                loadFixtures('beacons/illuminated-main-beacon.html');    
            });
            
            it('should start a countdown', function(){
                spyOn(FREE.Countdowner, 'countdown');
                this.mainBeacon.run();
                expect(FREE.Countdowner.countdown).toHaveBeenCalled();
            });
            
            describe('when the countdown ends', function(){
                it('should tell the server', function(){
                    spyOn(FREE.Countdowner, 'countdown').and.callFake(function($timer, done){
                        done();
                    });
                    
                    spyOn(jQuery, 'get').and.callFake(function(path){
                        expect(path).toBe('/beacons/delete');
                    });
                    
                    this.mainBeacon.run();
                    
                    expect(jQuery.get).toHaveBeenCalled();
                });
            });
        })
        
        describe('when deactivate', function(){
            beforeEach(function(){
                loadFixtures('beacons/deactivated-main-beacon.html');
            });
            
            it('should not start a countdown', function(){
                spyOn(FREE.Countdowner, 'countdown');
                this.mainBeacon.run();
                expect(FREE.Countdowner.countdown).not.toHaveBeenCalled();
            });
        })
    });
});