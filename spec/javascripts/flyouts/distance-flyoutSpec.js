describe('DistanceFlyout', function(){
    describe('registerEventHandlers()', function(){
        beforeEach(function(){
            var distanceFlyout;
            
            loadFixtures('flyouts/distance-flyout.html');
            setStyleFixtures('.distance-flyout {display: none;}');
            
            distanceFlyout = FREE.DistanceFlyout;
            distanceFlyout.init();
            distanceFlyout.registerEventHandlers();
        })
        
        describe('when distance clicked', function(){
            beforeEach(function(){
                spyOn(FREE.CloseButton, 'registerEventHandlers');
                $('.distance-link').click();
            });
            
            it('should show the distance flyout', function(){
                expect($('.distance-flyout')).toBeVisible();
            });
            
            it('should register the close handler', function(){
                expect(FREE.CloseButton.registerEventHandlers).toHaveBeenCalled();
            });
        });
    });
});
