describe('HeaderTimer', function(){
    describe('run()', function(){
        var headerTimer;
            
        beforeEach(function(){
            headerTimer = FREE.HeaderTimer;
        });
        
        describe('when no time value', function(){    
            it('should make the timer invisible', function(){
                loadFixtures('timers/no-header-timer.html');
                
                headerTimer.init();
                headerTimer.run();
                
                expect($('input[name="header-timer"]')).toHaveCss({'visibility': 'hidden'});
            });
        });
        
        describe('when time value', function(){
            beforeEach(function(){
                loadFixtures('timers/header-timer.html');
            });
            
            it('should start a countdown', function(){
                spyOn(FREE.Countdowner, 'countdown').and.callFake(function($timer, countdownFn){
                    countdownFn();
                });
                
                spyOn(FREE.HeaderBeacon, 'init');
                
                headerTimer.init();
                headerTimer.run();
                
                expect(FREE.HeaderBeacon.init).toHaveBeenCalled();
            });
            
            it('should register a click handler', function(){
                headerTimer.init();
                headerTimer.run();
                
                $('input[name="header-timer"]').click();
                expect($('input[type="number"][name="header-timer"]')).toExist();
            });
        });
    });
});