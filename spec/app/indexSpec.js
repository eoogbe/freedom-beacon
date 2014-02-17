describe('index', function(){
    describe('index()', function(){
        var copy = require('../../lib/copy').copy;
        
        var helper = require('./spec-helper');
        var res;
        
        var index = require('../../routes');
        
        beforeEach(function(){
            res = copy(helper.res);
            index.index({}, res);
        });
        
        it('should render the index view', function(){
            expect(res.view).toBe('index');
        });
        
        it('should not use the header', function(){
            expect(res.data.isSplash).toBeTruthy();
        });
    });
});