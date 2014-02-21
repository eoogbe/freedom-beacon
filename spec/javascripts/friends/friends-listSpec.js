describe('FriendsList', function(){
    describe('registerEventHandlers()', function(){
        beforeEach(function(){
            loadFixtures('friends/friends-list.html');
            setStyleFixtures('.distance-flyout {display: none}');
            
            var friendsList = FREE.FriendsList;
            friendsList.init();
            friendsList.registerEventHandlers();
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