describe('Countdowner', function(){
    var $timer;
    var countdownFn;
    var countdowner;
    
    beforeEach(function(){
        jasmine.clock().install();
        
        $timer = jasmine.createSpyObj('$timer', ['data', 'val']);
        countdownFn = jasmine.createSpy('countdownFn');
        
        countdowner = FREE.Countdowner;
        countdowner.init();
    });
    
    afterEach(function(){
        jasmine.clock().uninstall();
    });
    
    describe('countdown()', function(){
        describe('with seconds remaining', function(){
            it('should decrement the remaining seconds', function(){
                $timer.data.and.returnValue('11');
                
                countdowner.countdown($timer, countdownFn);
                jasmine.clock().tick(1001);
                
                expect($timer.data).toHaveBeenCalledWith('sec', 10);
                expect($timer.val).toHaveBeenCalledWith('11:10');
            });
            
            it('should pad single digit seconds with a 0', function(){
                $timer.data.and.returnValue('2');
                
                countdowner.countdown($timer, countdownFn);
                jasmine.clock().tick(1001);
                
                expect($timer.data).toHaveBeenCalledWith('sec', 1);
                expect($timer.val).toHaveBeenCalledWith('2:01');
            });
        });
        
        describe('with minutes remaining', function(){
            it('should decrement the remaining minutes', function(){
                $timer.data.and.callFake(function(data){
                    return data === 'min' ? '2' : '0';
                });
                
                countdowner.countdown($timer, countdownFn);
                jasmine.clock().tick(1001);
                
                expect($timer.data).toHaveBeenCalledWith('min', 1);
                expect($timer.data).toHaveBeenCalledWith('sec', 59);
                
                expect($timer.val).toHaveBeenCalledWith('1:59');
            });
        });
        
        describe('with no minutes remaining', function(){
            it('should call the callback', function(){
                $timer.data.and.returnValue('0');
                
                countdowner.countdown($timer, countdownFn);
                jasmine.clock().tick(1001);
                
                expect(countdownFn).toHaveBeenCalled();
            });
        });
    });
    
    describe('stop()', function(){
        it('should stop the countdown', function(){
            $timer.val.and.returnValue('2');
            
            countdowner.countdown($timer, countdownFn);
            countdowner.stop();
            jasmine.clock().tick(1001);
            
            expect($timer.val).not.toHaveBeenCalled();
        });
    });
});