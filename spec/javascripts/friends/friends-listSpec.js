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
                $('.free:first > td > a').click();
                expect($('.free:first > .status')).toHaveText('pinged');
            });
            
            it('should ping offline friends', function(){
                $('.offline:first > td > a').click();
                expect($('.offline:first > .status')).toHaveText('pinged');
            });
        });
        
        describe('when distance clicked', function(){
            it('should show the distance flyout', function(){
                $('.pinging:first > td > button[name="distance-btn"]').click();
                expect($('.pinging:first > td > .distance-flyout')).toBeVisible();
            });
        });
        
        describe('when close clicked', function() {
            it('should hide the distance flyout', function(){
                $('.pinging:first > td > button[name="distance-btn"]').click();
                $('.pinging:first > td > .distance-flyout > button[name="close-btn"]').click();
                
                expect($('.pinging:first > td > .distance-flyout')).not.toBeVisible();
            });
        });
    });
});