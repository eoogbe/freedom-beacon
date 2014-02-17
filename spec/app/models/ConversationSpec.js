describe('Conversation', function(){
    var Conversation = require('../../../models/Conversation');
    var ObjectId = require('mongoose').Schema.Types.ObjectId;
    
    describe('findMessages()', function(){
        it('should find all the messages', function(){
            var conversation = new Conversation({
                'messages': [
                    {
                        'text': 'message text',
                        'sender': new ObjectId('user0')
                    },
                    {
                        'text': 'message text 2',
                        'sender': new ObjectId('user1')
                    }
                ]
            });
            
            var messages = conversation.findMessages('user0');
            
            var expected = [
                {
                    'text': 'message text',
                    'sender': 'user'
                },
                {
                    'text': 'message text 2',
                    'sender': 'friend'
                }
            ];
            
            expect(messages).toEqual(expected);
        });
    });
    
    describe('getFriendId()', function(){
        it('should get the friend id', function(){
            var conversation = new Conversation({
                'users': [new ObjectId('user0'), new ObjectId('user1')]
            });
            
            expect(conversation.getFriendId('user0')).toEqual(new ObjectId('user1'));
        });
    });
});