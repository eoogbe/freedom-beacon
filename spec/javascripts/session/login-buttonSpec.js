describe('LoginButton', function(){
    var loginButton;
    
    beforeEach(function(){
        loginButton = FREE.LoginButton;
    });
    
    describe('init()', function(){
        it('should enable the button', function(){
            loginButton.init();
            expect($('button[name="login"]')).not.toBeDisabled();
        });
    });
    
    describe('registerEventHandlers()', function(){    
        beforeEach(function(){
            loadFixtures('session/login-button.html');
            
            FB = jasmine.createSpyObj(FB, ['getLoginStatus', 'login', 'api']);
            FB.api.and.callFake(function(url, fn){
                fn({'id': 1, 'name': 'user'});
            });
            
            spyOn(navigator.geolocation, 'watchPosition').and.callFake(function(fn){
                fn({'coords': 'c'});
            });
            
            spyOn(jQuery, 'post').and.callFake(function(url, data, done){
                done();
            });
            
            spyOn(FREE.Url, 'redirect');
            loginButton.init();
        });
        
        describe('when logged in', function(){
            beforeEach(function(){
                FB.getLoginStatus.and.callFake(function(fn){
                    fn({'status': 'connected'});
                });
            });
            
            it('should watch the position', function(){
                loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                expect(navigator.geolocation.watchPosition).toHaveBeenCalled();
            });
            
            it('should get the user\'s data', function(){
                FB.api.and.callFake(function(url, fn){
                    expect(url).toBe('/me');
                    fn({'id': 1, 'name': 'user'});
                });
                
                loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                expect(FB.api).toHaveBeenCalled();
            });
            
            it('should create the session', function(){
                jQuery.post.and.callFake(function(url, data, done){
                    expect(url).toBe('/sessions');
                    expect(data).toEqual({'fbId': 1, 'name': 'user', 'coords': 'c'})
                    
                    done();
                });
                
                loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                expect(jQuery.post).toHaveBeenCalled();
            });
            
            it('should redirect to the /beacons/create', function(){
                spyOn(FREE.Url, 'init');
                loginButton.registerEventHandlers();
                
                $('button[name="login"]').click();
                
                expect(FREE.Url.init).toHaveBeenCalled();
                expect(FREE.Url.redirect).toHaveBeenCalledWith('/beacons/create');
            });
        });
        
        describe('when not logged in', function(){
            beforeEach(function(){
                FB.getLoginStatus.and.callFake(function(fn){
                    fn({'authResponse': true});
                });
                
                FB.login.and.callFake(function(fn){
                    fn({'authResponse': true});
                });
            });
            
            it('should log in', function(){
                FB.login.and.callFake(function(fn, permissions){
                    expect(permissions).toEqual({'scope': 'read_mailbox'});
                    fn({'authResponse': true});
                });
                
                loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                expect(FB.login).toHaveBeenCalled();
            });
            
            it('should watch the position', function(){
                loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                expect(navigator.geolocation.watchPosition).toHaveBeenCalled();
            });
            
            it('should get the user\'s data', function(){
                FB.api.and.callFake(function(url, fn){
                    expect(url).toBe('/me');
                    fn({'id': 1, 'name': 'user'});
                });
                
                loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                expect(FB.api).toHaveBeenCalled();
            });
            
            it('should create the session', function(){
                jQuery.post.and.callFake(function(url, data, done){
                    expect(url).toBe('/sessions');
                    expect(data).toEqual({'fbId': 1, 'name': 'user', 'coords': 'c'})
                    
                    done();
                });
                
                loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                expect(jQuery.post).toHaveBeenCalled();
            });
            
            it('should redirect to the /beacons/create', function(){
                spyOn(FREE.Url, 'init');
                loginButton.registerEventHandlers();
                
                $('button[name="login"]').click();
                
                expect(FREE.Url.init).toHaveBeenCalled();
                expect(FREE.Url.redirect).toHaveBeenCalledWith('/beacons/create');
            });
        });
    });
});
