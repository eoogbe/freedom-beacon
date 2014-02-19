describe('User', function(){
    describe('addConversation()', function(){
        var mongoose = require('mongoose');
        var ObjectId = mongoose.Types.ObjectId;
        
        require('../../../models/User');
        
        var helper = require('../spec-helper');
        
        var User = mongoose.model('User');        
        var user;
        
        beforeEach(function(){
            user = new User({'conversations' : []});
            spyOn(user, 'save');
            user.addConversation(new ObjectId(helper.ids.conv0));
        });
        
        it('should add the conversation', function(){
            expect(user.conversations).toContain(new ObjectId(helper.ids.conv0));
        });
        
        it('should save the changes', function(){
            expect(user.save).toHaveBeenCalled();
        });
    });
});
