describe('LogoutButton', function(){
    describe('registerEventHandlers()', function(){
        beforeEach(function(){    
            setFixtures('<button name="logout" type="button">Logout</button>');
            
            FB = jasmine.createSpyObj('FB', ['logout']);
            spyOn(FREE.Url, 'redirect');
            
            this.logoutButton = FREE.LogoutButton;
            this.logoutButton.init();
        });
        
        it('should log out of Facebook', function(){
            this.logoutButton.registerEventHandlers();
            $('button[name="logout"]').click();
            expect(FB.logout).toHaveBeenCalled();
        });
        
        it('should redirect to the homepage', function(){
            spyOn(FREE.Url, 'init');
            this.logoutButton.registerEventHandlers();
            
            $('button[name="logout"]').click();
            
            expect(FREE.Url.init).toHaveBeenCalled();
            expect(FREE.Url.redirect).toHaveBeenCalledWith('/');
        });
    });
});