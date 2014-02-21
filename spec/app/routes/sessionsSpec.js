describe('sessions', function(){
    describe('post()', function(){
        var mongoose = require('mongoose');
        var copy = require('../../../lib/copy').copy;
        var helper = require('../spec-helper');
        var sessions = require('../../../routes/sessions');
        
        require('../../../models/User');
        var User = mongoose.model('User');
        
        var request;
        var response;
        
        beforeEach(function(){
            response = copy(helper.response);
            request =
            {
                'session': {},
                'body': {'username': 'uname', 'name': 'thename'}
            };
        });
        
        describe('with an existing user', function(){
            beforeEach(function(){
                spyOn(User, 'find').andReturn({
                    'exec': function(done){
                        done(null, [{'_id': helper.ids.user0}]);
                    }
                });
                
                sessions.post(request, response);
            });
            
            it('should set request.session.userId to the user\'s id', function(){
                expect(User.find).toHaveBeenCalledWith({'username': 'uname'});
                expect(request.session.userId).toBe(helper.ids.user0);
                expect(response.sent).toBe(200);
            });
        });
        
        describe('with a new user', function(){
            beforeEach(function(){
                spyOn(User, 'find').andReturn({
                    'exec': function(done){
                        done(null, []);
                    }
                });
            });
            
            it('should create a new user in the database', function(){
                spyOn(User, 'create').andCallFake(function(data, done){
                    expect(data.username).toBe('uname');
                    expect(data.name).toBe('thename');
                    expect(data.friends).toEqual([]);
                    
                    done(null, {'_id': helper.ids.user0});
                }); 
                
                sessions.post(request, response);
                expect(User.create).toHaveBeenCalled();
            });
            
            it('should set request.session.userId to the user\'s id', function(){
                spyOn(User, 'create').andCallFake(function(data, done){
                    done(null, {'_id': helper.ids.user0});
                });
                
                sessions.post(request, response);
                expect(request.session.userId).toBe(helper.ids.user0);
            });
            
            it('should send the ok status', function(){
                spyOn(User, 'create').andCallFake(function(data, done){
                    done(null, {'_id': helper.ids.user0});
                });
                
                sessions.post(request, response);
                expect(response.sent).toBe(200);
            });
        });
    });
});