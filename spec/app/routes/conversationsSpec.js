describe('conversations', function(){
    describe('show()', function(){
        var copy = require('../../../lib/copy').copy;
        var helper = require('./spec-helper');
        var conversations = require('../../../routes/conversations');
        
        var Conversation = require('../../../models/Conversation');
        var User = require('../../../models/User');
        
        var request = {
            'params': {'id': '0'},
            'session': {'userId': '0'}
        };
        
        var response;
        
        beforeEach(function(){
            response = copy(helper.response);
        });
        
        it('should render the conversations-show view', function(){    
            spyOn(Conversation, 'findById').andCallFake(function(id, done){
                done(null, {
                    'findMessages': function(userId) { return []; },
                    'getFriendId': function(userId) { return 1; }
                });
            });
            
            spyOn(User, 'findById').andCallFake(function(id, done){
                done(null, {'name': 'friend1'});
            });
            
            conversations.show(request, response);
            expect(response.view).toBe('conversations-show');
        });
        
        it('should load old messages', function(){
            spyOn(Conversation, 'findById').andCallFake(function(id, done){
                var conversation =
                {
                    'findMessages': function(userId) {
                        return id === '0' ? ['message'] : null;
                    },
                    
                    'getFriendId': function(userId) { return 1; }
                };
                
                if (id === '0') done(null, conversation);
            });
            
            spyOn(User, 'findById').andCallFake(function(id, done){
                done(null, {'name': 'friend1'});
            });
            
            conversations.show(request, response);
            expect(response.data.messages).toEqual(['message']);
        });
        
        it('should add the friend name', function(){
            spyOn(Conversation, 'findById').andCallFake(function(id, done){
                var conversation =
                {
                    'findMessages': function(userId) { return []; },
                    
                    'getFriendId': function(userId) {
                        return userId === '0' ? 1 : null;
                    }
                };
                
                done(null, conversation);
            });
            
            spyOn(User, 'findById').andCallFake(function(id, done){
                if (id === 1) done(null, {'name': 'friend1'});
            });
            
            conversations.show(request, response);
            expect(response.data.friend).toBe('friend1');
        });
    });
});