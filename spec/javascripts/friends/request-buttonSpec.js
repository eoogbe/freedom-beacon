describe('RequestButton', function(){
    describe('registerEventHandlers()', function(){
        it('should replace the add button with pending', function(){
            loadFixtures('friends/request-button.html');
            
            var requestButton = FREE.RequestButton;
            requestButton.init();
            requestButton.registerEventHandlers();
            
            var $addFriendBtn = $('button[name="add-friend-btn"]');
            var $container = $addFriendBtn.parent();
            
            $addFriendBtn.click();
            
            expect($('button[name="add-friend-btn"]')).not.toExist();
            expect($container).toContainText('pending');
        });
    });
});