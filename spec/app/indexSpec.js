describe('index', function(){
    describe('index()', function(){
        var helper = require('./spec-helper');
        var res = helper.res;
        
        var index = require('../../routes');
        
        beforeEach(function(){
            index.index({}, res);
        });
        
        it('should render the index view', function(){
            expect(res.view).toBe('index');
        });
        
        it('should not use the header', function(){
            expect(res.data.splash).toBeDefined();
        });
    });
});