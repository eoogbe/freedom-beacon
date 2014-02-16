describe('BackButton', function(){
    describe('registerEventHandlers()', function(){
        it('should go back', function(){
            loadFixtures('nav/back-button.html');
            spyOn(FREE.Url, 'goBack');
            
            var backButton = FREE.BackButton;
            backButton.init();
            backButton.registerEventHandlers();
            
            $('.back-btn').click();
            
            expect(FREE.Url.goBack).toHaveBeenCalled();
        });
    });
});