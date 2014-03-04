describe('MessageButton', function(){
    describe('registerEventHandlers()', function(){
        var threads;
        
        beforeEach(function(){
            loadFixtures('friends/message-button.html');
            setStyleFixtures('.flash {display: none;}');
            
            FB = jasmine.createSpyObj('FB', ['login', 'api']);
            
            threads = [
                {
                    'to': [{'id': 0}, {'id': 1}],
                    'id': 3
                },
                {
                    'to': [{'id': 0}, {'id': 2}],
                    'id': 4
                }
            ];
            
            FB.login.and.callFake(function(done){
                done({'authResponse': true});
            });
            
            FB.api.and.callFake(function(url, done){
                done({'data': threads});
            });
            
            spyOn(FREE.Url, 'redirect');
            
            this.messageButton = FREE.MessageButton;
            this.messageButton.init();
        });
        
        it('should show the flash', function(){
            this.messageButton.registerEventHandlers();
            $('.msg-btn').click();
            
            expect('.flash').toBeVisible();
            expect('.flash').toHaveText('Loading data...');
        });
        
        it('should log in to Facebook', function(){
            FB.login.and.callFake(function(done, data){
                expect(data).toEqual({'scope': 'read_mailbox'});
                done({'authResponse': true});
            });
            
            this.messageButton.registerEventHandlers();
            $('.msg-btn').click();
            
            expect(FB.login).toHaveBeenCalled();
        });
        
        describe('when authorized', function(){
            it('should get the threads', function(){
                FB.api.and.callFake(function(url, done){
                    expect(url).toBe('/me/inbox');
                    done({'data': threads});
                });
                
                this.messageButton.registerEventHandlers();
                $('.msg-btn').click();
                
                expect(FB.api).toHaveBeenCalled();
            });
            
            describe('with thread', function(){
                it('should redirect to the mobile message page', function(){
                    var url = 'https://m.facebook.com/messages/read/?tid=4';
                    
                    this.messageButton.registerEventHandlers();
                    $('.msg-btn').click();
                    
                    expect(FREE.Url.redirect).toHaveBeenCalledWith(url);
                });
            });
            
            describe('without thread', function(){
                beforeEach(function(){
                    FB.api.and.callFake(function(url, done){
                        threads = [
                            {
                                'to': [{'id': 0}, {'id': 1}],
                                'id': 3
                            },
                            {
                                'to': [{'id': 0}, {'id': 3}],
                                'id': 5
                            }
                        ];
                        
                        if (url === '/me/inbox') {
                            done({'data': threads});
                        } else if (url === '/2') {
                            done({'username': 'uname'});
                        }
                    });
                    
                    this.messageButton.registerEventHandlers();
                    $('.msg-btn').click();
                });
                
                it('should get the username', function(){
                    expect(FB.api.calls.count()).toBe(2);
                });
                
                
                it('should redirect to the desktop message page', function(){
                    var url = 'https://facebook.com/messages/uname';
                    expect(FREE.Url.redirect).toHaveBeenCalledWith(url);
                });
            });
        });
        
        describe('when unauthorized', function(){
            beforeEach(function(){
                FB.login.and.callFake(function(done){
                    done({});
                });
            });
            
            it('should get the username', function(){
                FB.api.and.callFake(function(url, done){
                    expect(url).toBe('/2');
                    done({'username': 'uname'});
                });
                
                this.messageButton.registerEventHandlers();
                $('.msg-btn').click();
                
                expect(FB.api).toHaveBeenCalled();
            });
            
            it('should redirect to the desktop message page', function(){
                var url;
                
                FB.api.and.callFake(function(url, done){
                    done({'username': 'uname'});
                });
                
                this.messageButton.registerEventHandlers();
                $('.msg-btn').click();
                
                url = 'https://facebook.com/messages/uname';
                expect(FREE.Url.redirect).toHaveBeenCalledWith(url);
            });
        });
    });
});
