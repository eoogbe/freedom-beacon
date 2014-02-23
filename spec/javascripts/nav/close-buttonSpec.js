describe('CloseButton', function(){
    describe('registerEventHandlers()', function(){
        it('should hide the flyout', function(){
            loadFixtures('nav/close-button.html');
            
            var closeButton = FREE.CloseButton;
            closeButton.init();
            closeButton.registerEventHandlers();
            
            $('.close-btn').click();
            
            expect($('.flyout')).not.toBeVisible();
        });
    });
});