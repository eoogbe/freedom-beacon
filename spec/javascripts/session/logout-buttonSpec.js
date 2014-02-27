describe('LogoutButton', function(){
    describe('registerEventHandlers()', function(){
        var logoutButton;
        
        beforeEach(function(){    
            loadFixtures('session/logout-button.html');
            
            FB = jasmine.createSpyObj('FB', ['logout']);
            spyOn(FREE.Url, 'redirect');
            
            logoutButton = FREE.LogoutButton;
            logoutButton.init();
        });
        
        it('should log out of Facebook', function(){
            logoutButton.registerEventHandlers();
            $('button[name="logout"]').click();
            expect(FB.logout).toHaveBeenCalled();
        });
        
        it('should redirect to the homepage', function(){
            spyOn(FREE.Url, 'init');
            logoutButton.registerEventHandlers();
            
            $('button[name="logout"]').click();
            
            expect(FREE.Url.init).toHaveBeenCalled();
            expect(FREE.Url.redirect).toHaveBeenCalledWith('/');
        });
    });
});