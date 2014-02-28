describe('LoginButton', function(){
    beforeEach(function(){
        loadFixtures('session/login-button.html');
        setStyleFixtures('.flash {display: none;} .location-flyout {display: none;}');
        
        this.loginButton = FREE.LoginButton;
    });
    
    describe('init()', function(){
        it('should enable the button', function(){
            this.loginButton.init();
            expect($('button[name="login"]')).not.toBeDisabled();
        });
    });
    
    describe('registerEventHandlers()', function(){    
        beforeEach(function(){
            FB = jasmine.createSpyObj(FB, ['getLoginStatus', 'login', 'api']);
            
            FB.getLoginStatus.and.callFake(function(fn){
                fn({'status': 'connected'});
            });
            
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
            
            this.loginButton.init();
        });
        
        it('should watch the position', function(){
            this.loginButton.registerEventHandlers();
            $('button[name="login"]').click();
            
            expect(navigator.geolocation.watchPosition).toHaveBeenCalled();
        });
        
        it('should show the flash', function(){
            this.loginButton.registerEventHandlers();
            
            $('button[name="login"]').click();
            
            expect($('.flash')).toBeVisible();
            expect($('.flash')).toHaveText('Loading data...');
        });
        
        it('should get the user\'s data', function(){
            FB.api.and.callFake(function(url, fn){
                expect(url).toBe('/me');
                fn({'id': 1, 'name': 'user'});
            });
            
            this.loginButton.registerEventHandlers();
            $('button[name="login"]').click();
            expect(FB.api).toHaveBeenCalled();
        });
        
        it('should create the session', function(){
            jQuery.post.and.callFake(function(url, data, done){
                expect(url).toBe('/sessions');
                expect(data).toEqual({'fbId': 1, 'name': 'user', 'coords': 'c'})
                
                done();
            });
            
            this.loginButton.registerEventHandlers();
            $('button[name="login"]').click();
            expect(jQuery.post).toHaveBeenCalled();
        });
        
        it('should redirect to the /beacons/create', function(){
            spyOn(FREE.Url, 'init');
            this.loginButton.registerEventHandlers();
            
            $('button[name="login"]').click();
            
            expect(FREE.Url.init).toHaveBeenCalled();
            expect(FREE.Url.redirect).toHaveBeenCalledWith('/beacons/create');
        });
        
        describe('when permission to use location is denied', function(){
            beforeEach(function(){
                navigator.geolocation.watchPosition.and.callFake(function(success, failure){
                    failure({'code': 2, 'POSITION_UNAVAILABLE': 1, 'PERMISSION_DENIED': 2});
                });
                
                this.loginButton.registerEventHandlers();
                $('button[name="login"]').click();
            });
            
            it('should show the location flyout', function(){
                expect($('.location-flyout')).toBeVisible();
            });
            
            it('should register the with location click handler', function(){
                $('button[name="with-location"]').click();
                expect(navigator.geolocation.watchPosition.calls.count()).toBe(2);
            });
            
            it('should reigster the without location click handler', function(){
                $('button[name="without-location"]').click();
                expect(navigator.geolocation.watchPosition.calls.count()).toBe(1);
            });
        });
        
        describe('when position unavailable', function(){
            beforeEach(function(){
                navigator.geolocation.watchPosition.and.callFake(function(success, failure){
                    failure({'code': 1, 'POSITION_UNAVAILABLE': 1, 'PERMISSION_DENIED': 2});
                });
            });
            
            it('should create the session with no coords', function(){
                jQuery.post.and.callFake(function(url, data, done){
                    expect(url).toBe('/sessions');
                    expect(data).toEqual({'fbId': 1, 'name': 'user', 'coords': null})
                    
                    done();
                });
                
                this.loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                
                expect(jQuery.post).toHaveBeenCalled();
            });
        });
        
        describe('when logged in', function(){
            it('should not log in again', function(){
                this.loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                
                expect(FB.login).not.toHaveBeenCalled();
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
                
                this.loginButton.registerEventHandlers();
                $('button[name="login"]').click();
                
                expect(FB.login).toHaveBeenCalled();
            });
        });
    });
});
