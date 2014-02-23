describe('fbFriends', function(){
    describe('index()', function(){
        var copy = require('../../../lib/copy').copy;
        var helper = require('../spec-helper');
        var fbFriends = require('../../../routes/fbFriends');
        
        var response;
        var fbFriendsData;
        
        beforeEach(function(){
            fbFriendsData =
            {
                'fbFriends': [{'name': 'friend1', 'id': 1}]
            };
            
            var request = {'query': {'fbFriends': fbFriendsData}};
            response = copy(helper.response);
            
            fbFriends.index(request, response);
        });
        
        it('renders the fbFriends-index view', function(){
            expect(response.view).toBe('fbFriends-index');
        });
        
        it('passes in the data from the request query', function(){
            expect(response.data.fbFriends).toBe(fbFriendsData);
        });
        
        it('doesn\'t render the layout', function(){
            expect(response.data.layout).toBe(false);
        });
    });
});