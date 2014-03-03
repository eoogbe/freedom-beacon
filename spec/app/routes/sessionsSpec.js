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
            User,
            user;
        
        mongoose = require('mongoose');
        
        require('../../../models/User');
        User = mongoose.model('User');
        
        beforeEach(function(){
            response = copy(helper.response);
            
            request =
            {
                'session': {},
                'body':
                {
                    'fbId': '0',
                    'name': 'thename',
                    'coords': {'latitude': 1.0, 'longitude': 2.5}
                }
            };
            
            user = jasmine.createSpyObj('user', ['markModified', 'save']);
            user._id = helper.ids.user0;
            user.save.andCallFake(function(done){
                done();
            });
        });
        
        describe('with an existing user', function(){
            beforeEach(function(){
                spyOn(User, 'findOne').andReturn({
                    'exec': function(done){
                        done(null, user);
                    }
                });
                
                sessions.post(request, response);
            });
            
            it('should find the user with the Facebook id from the request body', function(){
                expect(User.findOne).toHaveBeenCalledWith({'fbId': '0'});
            });
            
            it('should set request.session.userId to the user\'s id', function(){
                expect(request.session.userId).toBe(helper.ids.user0);
            });
            
            it('should send a 200 status code', function(){
                expect(response.sent).toBe(200);
            });
        });
        
        describe('with a new user', function(){
            beforeEach(function(){
                spyOn(User, 'findOne').andReturn({
                    'exec': function(done){
                        done();
                    }
                });
                
                spyOn(User, 'create').andCallFake(function(data, done){
                    done(null, user);
                });
            });
            
            it('should create a new user in the database', function(){
                User.create.andCallFake(function(data, done){
                    expect(data.fbId).toBe('0');
                    expect(data.name).toBe('thename');
                    
                    expect(data.beacon.timeSet).toBeDefined();
                    expect(data.beacon.duration).toBe(1);
                    
                    expect(data.position.latitude).toBe(1.0);
                    expect(data.position.longitude).toBe(2.5);
                    
                    done(null, user);
                }); 
                
                sessions.post(request, response);
                expect(User.create).toHaveBeenCalled();
            });
            
            it('should set request.session.userId to the user\'s id', function(){
                sessions.post(request, response);
                expect(request.session.userId).toBe(helper.ids.user0);
            });
            
            it('should send the ok status', function(){
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
