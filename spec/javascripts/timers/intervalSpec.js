describe('Interval', function(){
    var intervalFn;
    var interval;
    
    beforeEach(function(){
        intervalFn = jasmine.createSpy('intervalFn');
        interval = new FREE.Interval(intervalFn, 5);
    })
    
    describe('isRunning()', function(){
        it('should not be running when new', function(){
            expect(interval.isRunning()).toBe(false);
        });
    });
    
    describe('start()', function(){
        it('should be running', function(){
            interval.start();
            expect(interval.isRunning()).toBe(true);
        });
        
        it('should call the interval callback', function(){
            jasmine.clock().install();
            
            interval.start();
            jasmine.clock().tick(6);
            
            expect(intervalFn).toHaveBeenCalled();
            
            jasmine.clock().uninstall();
        });
    });
    
    describe('stop()', function(){
        it('should not be running', function(){
            interval.start();
            interval.stop();
            
            expect(interval.isRunning()).toBe(false);
        });
        
        it('should not call the interval callback', function(){
            jasmine.clock().install();
            
            interval.start();
            interval.stop();
            jasmine.clock().tick(6);
            
            expect(intervalFn).not.toHaveBeenCalled();
            
            jasmine.clock().uninstall();
        });
    });
});