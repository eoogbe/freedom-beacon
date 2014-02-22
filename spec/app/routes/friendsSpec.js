describe('friends', function(){
    var copy = require('../../../lib/copy').copy;
    
    var helper = require('../spec-helper');
    var response;
    
    var friends = require('../../../routes/friends');
    
    beforeEach(function(){
        response = copy(helper.response);
    });
    
    describe('index()', function(){
        var request;
        
        beforeEach(function(){
            request =
            {
                'query':
                {
                    'freeFriends': [ { 'name': 'friend1' } ],
                    'offlineFriends': [ { 'name': 'friend2' } ]
                }
            };
        });
        
        it('should render the friends-index view', function(){
            friends.index(request, response);
            expect(response.view).toBe('friends-index');
        });
        
        it('should not render the layout', function(){
            friends.index(request, response);
            expect(response.data.layout).toBe(false);
        });
        
        it('should send the freeFriends to the view', function(){
            friends.index(request, response);
            expect(response.data.freeFriends).toBeDefined();
            
        });
        
        it('should send the offlineFriends to the view', function(){
            friends.index(request, response);
            expect(response.data.offlineFriends).toBeDefined();
        });
        
        it('should redirect to the homepage when freeFriends and offlineFriends are not defined', function(){
            request = {'query': {}};
            friends.index(request, response);
            expect(response.path).toBe('/');
        });
    });
});
