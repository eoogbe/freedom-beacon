describe('DistanceFlyout', function(){
    describe('registerEventHandlers()', function(){
        beforeEach(function(){
            loadFixtures('friends/distance-flyout.html');
            setStyleFixtures('.distance-flyout {display: none}');
            
            var distanceFlyout = FREE.DistanceFlyout;
            distanceFlyout.init();
            distanceFlyout.registerEventHandlers();
        })
        
        describe('when distance clicked', function(){
            it('should show the distance flyout', function(){
                $('.distance-link').click();
                expect($('.distance-flyout')).toBeVisible();
            });
        });
        
        describe('when close clicked', function() {
            it('should hide the distance flyout', function(){
                $('.distance-link').click();
                $('.distance-flyout > button[name="close-btn"]').click();
                
                expect($('.distance-flyout')).not.toBeVisible();
            });
        });
    });
});
