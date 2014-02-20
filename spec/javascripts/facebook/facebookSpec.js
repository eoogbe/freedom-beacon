describe('Facebook', function(){
    describe('registerEventHandlers()', function(){
        var facebook;
        
        beforeEach(function(){
            FB = jasmine.createSpyObj('FB', ['init', 'api', 'login', 'logout']);
            FB.Event = jasmine.createSpyObj('FB.Event', ['subscribe']);
            
            spyOn(FREE.Url, 'redirect');
            spyOn(jQuery, 'getScript').and.callFake(function(url, done){
                expect(url).toBe('//connect.facebook.net/en_US/all.js');
                done();
            });
            
            facebook = FREE.Facebook;
        });
        
        describe('authResponseChangeHandler', function(){
            describe('when not on homepage', function(){
                it('should do nothing', function(){
                    spyOn(FREE.Url, 'getPathname').and.returnValue('/beacons/create');
                    facebook.init();
                    expect(FREE.Url.redirect).not.toHaveBeenCalled();
                });
            });
            
            describe('when logged in', function(){
                it('should post to the /sessions route', function(){
                    FB.Event.subscribe.and.callFake(function(eventName, fn){
                        fn({'status': 'connected'});
                    });
                    
                    FB.api.and.callFake(function(path, fn){
                        expect(path).toBe('/me');
                        fn({'username': 'uname', 'name': 'thename'});
                    });
                    
                    spyOn(jQuery, 'post').and.callFake(function(path, data, fn){
                        expect(path).toBe('/sessions');
                        
                        expect(data.username).toBe('uname');
                        expect(data.name).toBe('thename');
                        
                        fn();
                    });
                    
                    spyOn(FREE.Url, 'getPathname').and.returnValue('/');
                    
                    facebook.init();
                    expect(FREE.Url.redirect).toHaveBeenCalledWith('/beacons/create');
                });
            });
            
            describe('when not logged in', function(){
                it('should login', function(){
                    FB.Event.subscribe.and.callFake(function(eventName, fn){
                        fn({});
                    });
                    
                    spyOn(FREE.Url, 'getPathname').and.returnValue('/');
                    facebook.init();
                    expect(FB.login).toHaveBeenCalled();
                });
                
                it('should post to the /sessions route after logging in', function(){
                    FB.Event.subscribe.and.callFake(function(eventName, fn){
                        fn({});
                    });
                    
                    FB.login.and.callFake(function(fn){
                        fn({'authResponse': true});
                    });
                    
                    FB.api.and.callFake(function(path, fn){
                        expect(path).toBe('/me');
                        fn({'username': 'uname', 'name': 'thename'});
                    });
                    
                    spyOn(jQuery, 'post').and.callFake(function(path, data, fn){
                        expect(path).toBe('/sessions');
                        
                        expect(data.username).toBe('uname');
                        expect(data.name).toBe('thename');
                        
                        fn();
                    });
                    
                    spyOn(FREE.Url, 'getPathname').and.returnValue('/');
                    
                    facebook.init();
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