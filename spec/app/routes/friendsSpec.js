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
        
        describe('when friends', function(){
            it('should send the freeFriends to the view', function(){
                friends.index(request, response);
                expect(response.data.freeFriends).toBeDefined();
                
            });
            
            it('should send the offlineFriends to the view', function(){
                friends.index(request, response);
                expect(response.data.offlineFriends).toBeDefined();
            });
            
            it('should set hasFriends to a truthy value', function(){
                friends.index(request, response);
                expect(response.data.hasFriends).toBeTruthy();
            });
        });
        
        describe('when no friends', function(){
            it('should set hasFriends to a falsy value', function(){
                request =
                {
                    'query': {'freeFriends': [], 'offlineFriends': []}
                };
                
                friends.index(request, response);
                
                expect(response.data.hasFriends).toBeFalsy();
            });
        });
        
        describe('when friends not defined', function(){
            it('should redirect to the homepage', function(){
                request = {'query': {}};
                friends.index(request, response);
                expect(response.path).toBe('/');
            });
        });
    });
});
