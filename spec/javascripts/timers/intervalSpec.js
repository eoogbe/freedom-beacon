describe('Interval', function(){
    beforeEach(function(){
        this.intervalFn = jasmine.createSpy('intervalFn');
        this.interval = new FREE.Interval(this.intervalFn, 5);
    })
    
    describe('isRunning()', function(){
        it('should not be running when new', function(){
            expect(this.interval.isRunning()).toBe(false);
        });
    });
    
    describe('start()', function(){
        it('should be running', function(){
            this.interval.start();
            expect(this.interval.isRunning()).toBe(true);
        });
        
        it('should call the interval callback', function(){
            jasmine.clock().install();
            
            this.interval.start();
            jasmine.clock().tick(6);
            
            expect(this.intervalFn).toHaveBeenCalled();
            
            jasmine.clock().uninstall();
        });
    });
    
    describe('stop()', function(){
        it('should not be running', function(){
            this.interval.start();
            this.interval.stop();
            
            expect(this.interval.isRunning()).toBe(false);
        });
        
        it('should not call the interval callback', function(){
            jasmine.clock().install();
            
            this.interval.start();
            this.interval.stop();
            jasmine.clock().tick(6);
            
            expect(this.intervalFn).not.toHaveBeenCalled();
            
            jasmine.clock().uninstall();
        });
    });
});