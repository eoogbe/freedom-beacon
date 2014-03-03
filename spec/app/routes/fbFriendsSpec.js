describe('fbFriends', function(){
    var copy,
        helper,
        fbFriends,
        request,
        response;
    
    copy = require('../../../lib/copy').copy;
    helper = require('../spec-helper');
    
    fbFriends = require('../../../routes/fbFriends');
    
    beforeEach(function(){
        response = copy(helper.response);
    });
    
    describe('index()', function(){
        var fbFriendsData;
        
        describe('when html format', function(){
            beforeEach(function(){
                fbFriendsData =
                {
                    'fbFriends': [{'name': 'friend1', 'id': 1}]
                };
                
                request =
                {
                    'query': {'fbFriends': fbFriendsData, 'format': 'html'}
                };
                
                fbFriends.index(request, response);
            });
            
            it('should render the fbFriends-index view', function(){
                expect(response.view).toBe('fbFriends-index');
            });
            
            it('should pass in the data from the request query', function(){
                expect(response.data.fbFriends).toBe(fbFriendsData);
            });
            
            it('should not render the layout', function(){
                expect(response.data.layout).toBe(false);
            });
        });
        
        describe('when invalid format', function(){
            it('should redirect to the homepage', function(){
                fbFriends.index({'query':{}}, response);
                expect(response.path).toBe('/');
            });
        });
    });
});
