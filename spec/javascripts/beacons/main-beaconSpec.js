describe('MainBeacon', function(){
    describe('registerEventHandlers()', function(){
        beforeEach(function(){
            loadFixtures('beacons/main-beacon.html');
        });
        
        describe('when unchecked', function(){
            beforeEach(function(){
                spyOn(FREE.Countdowner, 'countdown');
                
                var mainBeacon = FREE.MainBeacon
                mainBeacon.init();
                mainBeacon.registerEventHandlers();
                
                $('#beacon').click();
            });
            
            it('should change the beacon button text to "deactivate beacon"', function(){
                expect($('.beacon-btn')).toHaveText('deactivate beacon');
            });
            
            it('should remove the btn-primary class', function(){
                expect($('.beacon-btn')).not.toHaveClass('btn-primary');
            });
            
            it('should add the btn-default class', function(){
                expect($('.beacon-btn')).toHaveClass('btn-default');
            });
            
            it('should add the readonly class to the main timer', function(){
                expect($('input[name="main-timer"]')).toHaveClass('readonly');
            });
            
            it('should make the timer readonly', function(){
                expect($('input[name="main-timer"]')).toHaveProp('readonly');
            });
            
            it('should start a countdown', function(){
                expect(FREE.Countdowner.countdown).toHaveBeenCalled();
            });
        });
        
        describe('when checked', function(){
            beforeEach(function(){
                spyOn(FREE.Countdowner, 'stop');
                
                var mainBeacon = FREE.MainBeacon
                mainBeacon.init();
                mainBeacon.registerEventHandlers();
                
                $('#beacon').click();
                $('#beacon').click();
            });
            
            it('should change the beacon button text to "illuminate beacon"', function(){
                expect($('.beacon-btn')).toHaveText('illuminate beacon');
            });
            
            it('should add the btn-primary class', function(){
                expect($('.beacon-btn')).toHaveClass('btn-primary');
            });
            
            it('should remove the btn-default class', function(){
                expect($('.beacon-btn')).not.toHaveClass('btn-default');
            });
            
            it('should remove the readonly class to the main timer', function(){
                expect($('input[name="main-timer"]')).not.toHaveClass('readonly');
            });
            
            it('should remove the readonly property from the timer', function(){
                expect($('input[name="main-timer"]')).toHaveProp('readonly', false);
            });
            
            it('should stop the countdown', function(){
                expect(FREE.Countdowner.stop).toHaveBeenCalled();
            });
        });
    });
});