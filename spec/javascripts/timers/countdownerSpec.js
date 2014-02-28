describe('Countdowner', function(){
    beforeEach(function(){
        jasmine.clock().install();
        
        this.$timer = jasmine.createSpyObj('$timer', ['data', 'val']);
        this.countdownFn = jasmine.createSpy('countdownFn');
        
        this.countdowner = FREE.Countdowner;
        this.countdowner.init(this.$timer, this.countdownFn);
    });
    
    afterEach(function(){
        jasmine.clock().uninstall();
    });
    
    describe('countdown()', function(){
        describe('with seconds remaining', function(){
            it('should decrement the remaining seconds', function(){
                this.$timer.data.and.returnValue('11');
                
                this.countdowner.countdown();
                jasmine.clock().tick(1001);
                
                expect(this.$timer.data).toHaveBeenCalledWith('sec', 10);
                expect(this.$timer.val).toHaveBeenCalledWith('11:10');
            });
            
            it('should pad single digit seconds with a 0', function(){
                this.$timer.data.and.returnValue('2');
                
                this.countdowner.countdown();
                jasmine.clock().tick(1001);
                
                expect(this.$timer.data).toHaveBeenCalledWith('sec', 1);
                expect(this.$timer.val).toHaveBeenCalledWith('2:01');
            });
        });
        
        describe('with minutes remaining', function(){
            it('should decrement the remaining minutes', function(){
                this.$timer.data.and.callFake(function(data){
                    return data === 'min' ? '2' : '0';
                });
                
                this.countdowner.countdown();
                jasmine.clock().tick(1001);
                
                expect(this.$timer.data).toHaveBeenCalledWith('min', 1);
                expect(this.$timer.data).toHaveBeenCalledWith('sec', 59);
                
                expect(this.$timer.val).toHaveBeenCalledWith('1:59');
            });
        });
        
        describe('with no minutes remaining', function(){
            it('should call the callback', function(){
                this.$timer.data.and.returnValue('0');
                
                this.countdowner.countdown();
                jasmine.clock().tick(1001);
                
                expect(this.countdownFn).toHaveBeenCalled();
            });
        });
    });
    
    describe('countdownC()', function(){
        describe('with minutes remaining', function(){
            it('should decrement the remaining minutes', function(){
                this.$timer.data.and.returnValue('2');
                
                this.countdowner.countdownC();
                jasmine.clock().tick(60001);
                
                expect(this.$timer.data).toHaveBeenCalledWith('min', 1);
                expect(this.$timer.val).toHaveBeenCalledWith(1);
            });
        });
        
        describe('with no minutes remaining', function(){
            it('should call the callback', function(){
                this.$timer.data.and.returnValue('0');
                
                this.countdowner.countdownC();
                jasmine.clock().tick(60001);
                
                expect(this.countdownFn).toHaveBeenCalled();
            });
        });
    });
    
    describe('stop()', function(){
        it('should stop the countdown', function(){
            this.$timer.val.and.returnValue('2');
            
            this.countdowner.countdown(this.$timer, this.countdownFn);
            this.countdowner.stop();
            jasmine.clock().tick(1001);
            
            expect(this.$timer.val).not.toHaveBeenCalled();
        });
    });
});