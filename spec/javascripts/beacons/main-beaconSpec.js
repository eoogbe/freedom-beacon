describe('MainBeacon', function(){
    describe('run()', function(){
        beforeEach(function(){
            this.mainBeacon = FREE.MainBeacon
            this.mainBeacon.init();
        });
        
        describe('when illuminated', function(){
            beforeEach(function(){
                spyOn(FREE.Countdowner, 'init');
                spyOn(FREE.Countdowner, 'countdown');
            });
            
            it('should start a countdown', function(){
                loadFixtures('beacons/illuminated-main-beacon.html');
                
                this.mainBeacon.run();
                
                expect(FREE.Countdowner.init).toHaveBeenCalled();
                expect(FREE.Countdowner.countdown).toHaveBeenCalled();
            });
            
            describe('when the countdown ends', function(){
                it('should tell the server', function(){
                    loadFixtures('beacons/illuminated-main-beacon.html');
                    
                    FREE.Countdowner.init.and.callFake(function($timer, done){
                        done();
                    });
                    
                    spyOn(jQuery, 'get').and.callFake(function(path, done){
                        expect(path).toBe('/beacons/delete');
                        done('<div></div>');
                    });
                    
                    this.mainBeacon.run();
                    
                    expect(jQuery.get).toHaveBeenCalled();
                    expect($('form[name="main-timer-form"]')).toHaveHtml('<div></div>');
                });
            });
            
            describe('when is Alternate C', function(){
                it('should start countdownC', function(){
                    loadFixtures('beacons/alt-c.html');
                    spyOn(FREE.Countdowner, 'countdownC');
                    
                    this.mainBeacon.run();
                    
                    expect(FREE.Countdowner.countdownC).toHaveBeenCalled();
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