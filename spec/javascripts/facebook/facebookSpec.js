describe('Facebook', function(){
    beforeEach(function(){
        FB = jasmine.createSpyObj('FB', ['init', 'api', 'login', 'logout', 'getLoginStatus']);
        
        spyOn(jQuery, 'getScript').and.callFake(function(url, done){
            done();
        });
        
        this.facebook = FREE.Facebook;
    });
    
    describe('init()', function(){
        beforeEach(function(){
            setFixtures('<input type="hidden" name="app-id" value="_5">');
            spyOn(FREE.LoginButton, 'registerEventHandlers');
        });
        
        it('should initialize Facebook', function(){
            this.facebook.init();
            
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
            
            this.facebook.init();
            
            expect(jQuery.getScript).toHaveBeenCalled();
        });
        
        it('should register the login button', function(){
            spyOn(FREE.LoginButton, 'init');
            
            this.facebook.init();
            
            expect(FREE.LoginButton.init).toHaveBeenCalled();
            expect(FREE.LoginButton.registerEventHandlers).toHaveBeenCalled();
        });
    });
});
