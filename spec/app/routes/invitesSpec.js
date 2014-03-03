describe('invites', function(){
    describe('index()', function(){
        var helper,
            copy,
            invites,
            response;
        
        helper = require('../spec-helper');
        copy = require('../../../lib/copy').copy;
        invites = require('../../../routes/invites');
        
        beforeEach(function(){
            response = copy(helper.response);
            invites.index({}, response);
        });
        
        it('should render the invites-index view', function(){
            expect(response.view).toBe('invites-index');
        });
        
        it('should not render the layout', function(){
            expect(response.data.layout).toBe(false);
        });
    });
});
