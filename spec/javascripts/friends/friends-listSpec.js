describe('FriendsList', function(){
    describe('registerEventHandlers()', function(){
        beforeEach(function(){
            loadFixtures('friends/friends-list.html');
            setStyleFixtures('.distance-flyout {display: none}');
            
            var friendsList = FREE.FriendsList;
            friendsList.init();
            friendsList.registerEventHandlers();
        })
        
        describe('when meet requested', function(){
            it('should ping free friends', function(){
                $('.free:first > a').click();
                expect($('.free:first > .status')).toHaveText('pinged');
            });
            
            it('should ping offline friends', function(){
                $('.offline:first > a').click();
                expect($('.offline:first > .status')).toHaveText('pinged');
            });
        });
        
        describe('when distance clicked', function(){
            it('should show the distance flyout', function(){
                $('.pinging:first > button[name="distance-btn"]').click();
                expect($('.pinging:first > .distance-flyout')).toBeVisible();
            });
        });
        
        describe('when close clicked', function() {
            it('should hide the distance flyout', function(){
                $('.pinging:first > button[name="distance-btn"]').click();
                $('.pinging:first > .distance-flyout > button[name="close"]').click();
                
                expect($('.pinging:first > .distance-flyout')).not.toBeVisible();
            });
        });
    });
});