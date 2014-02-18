describe('index', function(){
    describe('index()', function(){
        var copy = require('../../../lib/copy').copy;
        
        var helper = require('../spec-helper');
        var response;
        
        var index = require('../../../routes');
        
        beforeEach(function(){
            response = copy(helper.response);
            index.index({}, response);
        });
        
        it('should render the index view', function(){
            expect(response.view).toBe('index');
        });
        
        it('should not use the header', function(){
            expect(response.data.isSplash).toBeTruthy();
        });
    });
});