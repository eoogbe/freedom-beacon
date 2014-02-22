describe('Facebook', function(){
    describe('registerEventHandlers()', function(){
        var facebook;
        
        beforeEach(function(){
            FB = jasmine.createSpyObj('FB', ['init', 'api', 'login', 'logout', 'getLoginStatus']);
            FB.Event = jasmine.createSpyObj('FB.Event', ['subscribe']);
            
            spyOn(FREE.Url, 'redirect');
            spyOn(jQuery, 'getScript').and.callFake(function(url, done){
                expect(url).toBe('//connect.facebook.net/en_US/all.js');
                done();
            });
            
            facebook = FREE.Facebook;
        });
        
        describe('loginHandler', function(){
            beforeEach(function(){
                loadFixtures('facebook/login.html');
            });
            
            describe('when logged in', function(){
                it('should post to the /sessions route', function(){
                    var response = {'id': 0, 'name': 'thename'};
                    
                    FB.api.and.callFake(function(path, fn){
                        fn(response);
                    });
                    
                    FB.getLoginStatus.and.returnValue('connected');
                    
                    spyOn(jQuery, 'post').and.callFake(function(path, data, fn){
                        expect(path).toBe('/sessions');
                        expect(data).toEqual({'fbId': 0, 'name': 'thename'});
                        
                        fn();
                    });
                    
                    facebook.init();
                    $('button[name="login"]').click();
                    expect(FREE.Url.redirect).toHaveBeenCalledWith('/beacons/create');
                });
            });
            
            describe('when not logged in', function(){
                it('should log in', function(){
                    spyOn(jQuery, 'post').and.callFake(function(path, data, fn){    
                        fn();
                    });
                    
                    facebook.init();
                    $('button[name="login"]').click();
                    expect(FB.login).toHaveBeenCalled();
                });
                
                it('should post to the /sessions route', function(){
                    var response = {'id': 0, 'name': 'thename'};
                    
                    FB.login.and.callFake(function(fn){
                        fn({'authResponse': true});
                    });
                    
                    FB.api.and.callFake(function(path, fn){
                        fn(response);
                    });
                    
                    FB.getLoginStatus.and.returnValue('not_authorized');
                    
                    spyOn(jQuery, 'post').and.callFake(function(path, data, fn){
                        expect(path).toBe('/sessions');
                        expect(data).toEqual({'fbId': 0, 'name': 'thename'});
                        
                        fn();
                    });
                    
                    facebook.init();
                    $('button[name="login"]').click();
                    expect(FREE.Url.redirect).toHaveBeenCalledWith('/beacons/create');
                });
            });
        });
        
        describe('logoutHandler', function(){
            beforeEach(function(){
                loadFixtures('facebook/logout.html');
                facebook.init();
                $('button[name="logout"]').click();
            });
            
            it('logs out of Facebook', function(){
                expect(FB.logout).toHaveBeenCalled();
            });
            
            it('redirects to the homepage', function(){
                expect(FREE.Url.redirect).toHaveBeenCalled();
            });
        });
    });
});