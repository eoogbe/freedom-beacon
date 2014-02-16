describe('Countdowner', function(){
    var $timer;
    var countdownFn;
    var countdowner;
    
    beforeEach(function(){
        jasmine.clock().install();
        
        $timer = jasmine.createSpyObj('$timer', ['val']);
        countdownFn = jasmine.createSpy('countdownFn');
        
        countdowner = FREE.Countdowner;
        countdowner.init();
    });
    
    afterEach(function(){
        jasmine.clock().uninstall();
    });
    
    describe('countdown()', function(){
        describe('with minutes remaining', function(){
            it('should decrement the remaining minutes', function(){
                $timer.val.and.returnValue('2');
                
                countdowner.countdown($timer, countdownFn);
                jasmine.clock().tick(60001);
                
                expect($timer.val).toHaveBeenCalledWith(1);
            });
        });
        
        describe('with no minutes remaining', function(){
            it('should call the callback', function(){
                $timer.val.and.returnValue('0');
                
                countdowner.countdown($timer, countdownFn);
                jasmine.clock().tick(60001);
                
                expect(countdownFn).toHaveBeenCalled();
            });
        });
    });
    
    describe('stop()', function(){
        it('should stop the countdown', function(){
            $timer.val.and.returnValue('2');
            
            countdowner.countdown($timer, countdownFn);
            countdowner.stop();
            jasmine.clock().tick(60001);
            
            expect($timer.val).not.toHaveBeenCalled();
        });
    });
});