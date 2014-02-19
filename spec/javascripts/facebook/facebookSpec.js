describe('Facebook', function(){
    describe('registerEventHandlers()', function(){
        var facebook;
        
        beforeEach(function(){
            FB = jasmine.createSpyObj('FB', ['init', 'login', 'logout']);
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
                it('should redirect to /beacons/create', function(){
                    FB.Event.subscribe.and.callFake(function(eventName, fn){
                        fn({'status': 'connected'});
                    });
                    spyOn(FREE.Url, 'getPathname').and.returnValue('/');
                    
                    facebook.init();
                    
                    expect(FREE.Url.redirect).toHaveBeenCalled();
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
                
                it('should redirect to /beacons/create after logging in', function(){
                    FB.Event.subscribe.and.callFake(function(eventName, fn){
                        fn({});
                    });
                    
                    FB.login.and.callFake(function(fn){
                        fn();
                    });
                    
                    spyOn(FREE.Url, 'getPathname').and.returnValue('/');
                    facebook.init();
                    expect(FREE.Url.redirect).toHaveBeenCalled();
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