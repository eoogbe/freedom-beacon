var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

require('../../../models/Conversation');

var helper = require('../spec-helper');

describe('Conversation', function(){
    var Conversation = mongoose.model('Conversation');
    
    describe('findMessages()', function(){
        it('should find all the messages', function(){
            var conversation = new Conversation({
                'messages': [
                    {
                        'text': 'message text',
                        'sender': new ObjectId(helper.ids.user0)
                    },
                    {
                        'text': 'message text 2',
                        'sender': new ObjectId(helper.ids.user1)
                    }
                ]
            });
            
            var messages = [
                {
                    'text': 'message text',
                    'sender': 'user'
                },
                {
                    'text': 'message text 2',
                    'sender': 'friend'
                }
            ];
            
            expect(conversation.findMessages(helper.ids.user0)).toEqual(messages);
        });
    });
    
    describe('getFriendId()', function(){
        it('should get the friend id', function(){
            users = {};
            users[helper.ids.user0] = true;
            users[helper.ids.user1] = true;
            
            var conversation = new Conversation({ 'users': users });
            
            expect(conversation.getFriendId(helper.ids.user0)).toEqual(new ObjectId(helper.ids.user1));
        });
    });
});
