describe('CloseButton', function(){
    describe('registerEventHandlers()', function(){
        it('should hide the flyout', function(){
            var closeButton;
            
            loadFixtures('flyouts/close-button.html');
            
            closeButton = FREE.CloseButton;
            closeButton.init();
            closeButton.registerEventHandlers();
            
            $('.close-btn').click();
            
            expect($('.flyout')).not.toBeVisible();
        });
    });
});