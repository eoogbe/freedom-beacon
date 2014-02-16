describe('HeaderTimer', function(){
    describe('run()', function(){
        var headerTimer;
            
        beforeEach(function(){
            headerTimer = FREE.HeaderTimer;
        });
        
        describe('when no time value', function(){    
            it('should make the timer invisible', function(){
                loadFixtures('timers/no-header-timer.html');
                
                headerTimer.init($('input[name="header-timer"]'));
                headerTimer.run();
                
                expect($('input[name="header-timer"]')).toHaveCss({'visibility': 'hidden'});
            });
        });
        
        describe('when time value', function(){
            it('should start a countdown', function(){
                loadFixtures('timers/header-timer.html');
                
                spyOn(FREE.Countdowner, 'countdown').and.callFake(function($timer, countdownFn){
                    countdownFn();
                });
                
                spyOn(FREE.HeaderBeacon, 'init');
                
                headerTimer.init($('input[name="header-timer"]'));
                headerTimer.run();
                
                expect(FREE.HeaderBeacon.init).toHaveBeenCalled();
            });
        });
    });
});