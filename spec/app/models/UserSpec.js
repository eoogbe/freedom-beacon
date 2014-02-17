describe('User', function(){
    describe('findFriends()', function(){
        var ObjectId = require('mongoose').Schema.Types.ObjectId;
        var User = require('../../../models/User');
        
        it('should split the friends into three catergories', function(){    
            spyOn(User, 'find').andReturn([
                new User({'status': 0, '_id': new ObjectId('user0')}),
                new User({'status': 1, '_id': new ObjectId('user1')}),
                new User({'status': 2, '_id': new ObjectId('user2')})
            ]);
            
            var user = new User({
                'friends': [
                    new ObjectId('user0'),
                    new ObjectId('user1'),
                    new ObjectId('user2')
                ]
            });
            
            var friends = user.findFriends();
            
            expect(friends.pinging.length).toBe(1);
            expect(friends.free.length).toBe(1);
            expect(friends.offline.length).toBe(1);
        });
        
        it('should set the friends\' statuses', function(){
            spyOn(User, 'find').andReturn([
                new User({'status': 0, '_id': new ObjectId('user0')}),
                new User({'status': 1, '_id': new ObjectId('user1')}),
                new User({'status': 2, '_id': new ObjectId('user2')})
            ]);
            
            var user = new User({
                'friends': [
                    new ObjectId('user0'),
                    new ObjectId('user1'),
                    new ObjectId('user2')
                ]
            });
            
            var friends = user.findFriends();
            
            expect(friends.pinging[0].status).toBe('pinging');
            expect(friends.free[0].status).toBe('free');
            expect(friends.offline[0].status).toBe('offline');
        });
        
        xit('should add a friend url', function(){
            spyOn(User, 'find').andReturn([
                new User({
                    'status': 0,
                    '_id': new ObjectId('user0'),
                    'conversations': [new ObjectId('conv0')]
                }),
                
                new User({
                    'status': 0,
                    '_id': new ObjectId('user1'),
                    'conversations': [new ObjectId('conv1'), new ObjectId('conv2')]
                }),
                
                new User({'status': 1, '_id': new ObjectId('user2')}),
                new User({'status': 2, '_id': new ObjectId('user3')})
            ]);
            
            var user = new User({
                'friends': [
                    new ObjectId('user0'),
                    new ObjectId('user1'),
                    new ObjectId('user2'),
                    new ObjectId('user3')
                ]
            });
            
            var friends = user.findFriends();
            
            expect(friends.pinging[0].url).toBe('/conversations/conv0');
            expect(friends.pinging[1].url).toBe('/conversations/conv2');
            expect(friends.free[0].url).toBe('#');
            expect(friends.offline[0].url).toBe('#');
        });
    });
});