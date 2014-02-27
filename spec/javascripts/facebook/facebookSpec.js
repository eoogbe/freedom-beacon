describe('Facebook', function(){
    var facebook;
    
    beforeEach(function(){
        FB = jasmine.createSpyObj('FB', ['init', 'api', 'login', 'logout', 'getLoginStatus']);
        
        spyOn(jQuery, 'getScript').and.callFake(function(url, done){
            done();
        });
        
        facebook = FREE.Facebook;
    });
    
    describe('init()', function(){
        beforeEach(function(){
            loadFixtures('facebook/init.html');
            
            spyOn(FREE.LoginButton, 'registerEventHandlers');
            spyOn(FREE.LogoutButton, 'registerEventHandlers');
        });
        
        it('should initialize Facebook', function(){
            facebook.init();
            
            expect(FB.init).toHaveBeenCalledWith({
                'appId': '5',
                'status': true,
                'cookie': true,
                'xfbml': true
            });
        });
        
        it('should get the JavaScript from facebook.net', function(){
            jQuery.getScript.and.callFake(function(url, done){
                expect(url).toBe('//connect.facebook.net/en_US/all.js');
                done();
            });
            
            facebook.init();
            
            expect(jQuery.getScript).toHaveBeenCalled();
        });
        
        it('should register the login button', function(){
            spyOn(FREE.LoginButton, 'init');
            
            facebook.init();
            
            expect(FREE.LoginButton.init).toHaveBeenCalled();
            expect(FREE.LoginButton.registerEventHandlers).toHaveBeenCalled();
        });
        
        it('should register the logout button', function(){
            spyOn(FREE.LogoutButton, 'init');
            
            facebook.init();
            
            expect(FREE.LogoutButton.init).toHaveBeenCalled();
            expect(FREE.LogoutButton.registerEventHandlers).toHaveBeenCalled();
        });
    });
});
