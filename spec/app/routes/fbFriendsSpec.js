describe('fbFriends', function(){
    var copy,
        helper,
        mongoose,
        User,
        fbFriends,
        request,
        response;
    
    copy = require('../../../lib/copy').copy;
    helper = require('../spec-helper');
    
    fbFriends = require('../../../routes/fbFriends');
    
    mongoose = require('mongoose');
    
    require('../../../models/User');
    User = mongoose.model('User');
    
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
        
        describe('when json format', function(){
            var user;
            
            beforeEach(function(){
                request =
                {
                    'query': {'format': 'json'},
                    'session': {'userId': helper.ids.user0}
                };
                
                user = {'fbFriends': 'fbFriends', 'threads': 'threads'};
                
                spyOn(User, 'findById').andReturn ({
                    'exec': function(done) {
                        done(null, user);
                    }
                });
            });
            
            it('should find the current user', function(){
                fbFriends.index(request, response);
                expect(User.findById).toHaveBeenCalledWith(helper.ids.user0);
            });
            
            it('should send a JSON object', function(){
                spyOn(response, 'json').andCallThrough();
                fbFriends.index(request, response);
                expect(response.json).toHaveBeenCalled();
            });
            
            describe('when Facebook friends stored', function(){
                it('should send the data', function(){
                    fbFriends.index(request, response);
                    expect(response.data).toEqual(user);
                });
            });
            
            describe('when Facebook friends not stored', function(){
                it('should not send the data', function(){
                    User.findById.andReturn({
                        'exec': function(done) {
                            done(null, {});
                        }
                    });
                    
                    fbFriends.index(request, response);
                    expect(response.data).toEqual({});
                });
            });
        });
        
        describe('when invalid format', function(){
            it('should redirect to the homepage', function(){
                fbFriends.index({'query':{}}, response);
                expect(response.path).toBe('/');
            });
        });
    });
    
    describe('post()', function(){
        var user;
        
        beforeEach(function(){
            request =
            {
                'session': {'userId': helper.ids.user0},
                'body': {'fbFriends': 'fbFriends', 'threads': 'threads'}
            };
            
            user = jasmine.createSpyObj('user', ['markModified', 'save']);
            
            spyOn(User, 'findById').andReturn({
                'exec': function(done) {
                    done(null, user);
                }
            });
            
            user.save.andCallFake(function(done){
                done();
            });
            
            fbFriends.post(request, response);
        });
        
        it('should find the current user', function(){
            expect(User.findById).toHaveBeenCalledWith(helper.ids.user0);
        });
        
        it('should set the user\'s fbFriends', function(){
            expect(user.fbFriends).toBe('fbFriends');
        });
        
        it('should set the user\'s threads', function(){
            expect(user.threads).toBe('threads');
        });
        
        it('should mark the fbFriends and threads modified', function(){
            expect(user.markModified).toHaveBeenCalled();
        });
        
        it('should save the changes', function(){
            expect(user.save).toHaveBeenCalled();
        });
        
        it('should send a 200 status code', function(){
            expect(response.sent).toBe(200);
        });
    });
});
