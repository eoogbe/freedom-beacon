describe('sessions', function(){
    var copy,
        helper,
        sessions,
        request,
        response;
    
    copy = require('../../../lib/copy').copy;
    helper = require('../spec-helper');
    sessions = require('../../../routes/sessions');
    
    describe('post()', function(){
        var mongoose,
            User;
        
        mongoose = require('mongoose');
        
        require('../../../models/User');
        User = mongoose.model('User');
        
        beforeEach(function(){
            response = copy(helper.response);
            request =
            {
                'session': {},
                'body': {'fbId': '0', 'name': 'thename'}
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
            
            it('should find the user with the Facebook id from the request body', function(){
                expect(User.find).toHaveBeenCalledWith({'fbId': '0'});
            });
            
            it('should set request.session.userId to the user\'s id', function(){
                expect(request.session.userId).toBe(helper.ids.user0);
            });
            
            it('should send a response with status 200', function(){
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
                    expect(data.fbId).toBe('0');
                    expect(data.name).toBe('thename');
                    
                    expect(data.beaconTimeSet).toBeDefined();
                    expect(data.beaconDuration).toBe(0);
                    
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
    
    describe('show()', function(){
        var next;
        
        beforeEach(function(){
            next = jasmine.createSpy('next');
        });
        
        describe('when request.session.userId set', function(){
            it('should call next()', function(){
                request = {'session': {'userId': helper.ids.user0}};
                sessions.show(request, response, next);
                expect(next).toHaveBeenCalled();
            });
        });
        
        describe('when request.session.userId not set', function(){
            it('should redirect to the homepage', function(){
                request = {'session': {}};
                
                sessions.show(request, response, next);
                
                expect(next).not.toHaveBeenCalled();
                expect(response.path).toBe('/');
            });
        });
    });
});