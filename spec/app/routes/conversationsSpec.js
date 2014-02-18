describe('conversations', function(){
    describe('show()', function(){
        var mongoose = require('mongoose');
        var ObjectId = mongoose.Types.ObjectId;
        
        var copy = require('../../../lib/copy').copy;
        var helper = require('../spec-helper');
        
        var conversations = require('../../../routes/conversations');
        
        require('../../../models/User');
        require('../../../models/Conversation');
        
        var User = mongoose.model('User');
        var Conversation = mongoose.model('Conversation');
        
        var request;
        var response;
        
        beforeEach(function(){
            request = {
                'params': {'id': helper.ids.conv0},
                'session': {'userId': helper.ids.user0}
            };
            
            response = copy(helper.response);
        });
        
        it('should render the conversations-show view', function(){    
            spyOn(Conversation, 'findById').andCallFake(function(id, done){
                done(null, {
                    'findMessages': function(userId) { return []; },
                    'getFriendId': function(userId) {
                        return new ObjectId(helper.ids.user1);
                    }
                });
            });
            
            spyOn(User, 'findById').andCallFake(function(id, done){
                done(null, {'name': 'friend1'});
            });
            
            conversations.show(request, response);
            expect(response.view).toBe('conversations-show');
        });
        
        describe('when the conversation is new', function(){
            it('should create a new Conversation', function(){
                spyOn(Conversation, 'create').andCallFake(function(data, done){
                    var users = {};
                    users[helper.ids.user0] = true;
                    users[helper.ids.user1] = true;
                    
                    var expectedData = { 'users': users, 'messages': [] };
                    
                    if (helper.equals(data, expectedData)) {
                        done(null, {'id': new ObjectId(helper.ids.conv0)});
                    }
                });
                
                spyOn(User, 'findById').andCallFake(function(id, done){
                    var user = { 'conversations': [], 'save': function(){} };
                    if (id === helper.ids.user1) user.name = 'friend1';
                    done(null, user);
                });
                
                request = {
                    'params': {'id': 'new'},
                    'query': {'friendId': helper.ids.user1},
                    'session': {'userId': helper.ids.user0}
                };
                
                conversations.show(request, response);
                expect(Conversation.create).toHaveBeenCalled();
            });
            
            it('should add the friend name', function(){
                spyOn(Conversation, 'create').andCallFake(function(data, done){
                    var users = {};
                    users[helper.ids.user0] = true;
                    users[helper.ids.user1] = true;
                    
                    var expectedData = { 'users': users, 'messages': [] };
                    
                    if (helper.equals(data, expectedData)) {
                        done(null, {'id': new ObjectId(helper.ids.conv0)});
                    }
                });
                
                spyOn(User, 'findById').andCallFake(function(id, done){
                    var user = { 'conversations': [], 'save': function(){} };
                    if (id === helper.ids.user1) {
                        user.name = 'friend1';
                    }
                    
                    done(null, user);
                });
                
                request = {
                    'params': {'id': 'new'},
                    'query': {'friendId': helper.ids.user1},
                    'session': {'userId': helper.ids.user0}
                };
                
                conversations.show(request, response);
                expect(response.data.friend).toBe('friend1');
            });
        });
        
        describe('when continuing a conversation', function(){
            it('should load old messages', function(){
                spyOn(Conversation, 'findById').andCallFake(function(id, done){
                    var conversation =
                    {
                        'findMessages': function(userId) {
                            return userId === helper.ids.user0
                                ? ['message'] : null;
                        },
                        
                        'getFriendId': function(userId) {
                            return new ObjectId(helper.ids.user1);
                        }
                    };
                    
                    if (id === helper.ids.conv0) {
                        done(null, conversation);
                    } else {
                        done();
                    }
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
                            return userId === helper.ids.user0
                                ? new ObjectId(helper.ids.user1) : null;
                        }
                    };
                    
                    done(null, conversation);
                });
                
                spyOn(User, 'findById').andCallFake(function(id, done){
                    if (id.equals(helper.ids.user1)) {
                        done(null, {'name': 'friend1'});
                    } else {
                        done();
                    }
                });
                
                conversations.show(request, response);
                expect(response.data.friend).toBe('friend1');
            });
        });
    });
});
