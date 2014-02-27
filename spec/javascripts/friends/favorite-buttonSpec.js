describe('FavoriteButton', function(){
    describe('registerEventHandlers()', function(){
        beforeEach(function(){
            this.favoriteButton = FREE.FavoriteButton;
            this.favoriteButton.init();
        });
        
        describe('when favoriting', function(){
            beforeEach(function(){
                loadFixtures('friends/favorite-button.html');
            });
            
            it('should post the favorite to the server', function(){
                spyOn(jQuery, 'post').and.callFake(function(url, data, done){
                    expect(url).toBe('/favorites');
                    expect(data).toEqual({'friendId': 1});
                    
                    done();
                });
                
                this.favoriteButton.registerEventHandlers();
                $('.favorite-btn').click();
                
                expect(jQuery.post).toHaveBeenCalled();
            });
            
            it('should replace the buton with an unfavorite button', function(){
                spyOn(jQuery, 'post').and.callFake(function(url, data, done){
                    done();
                });
                
                this.favoriteButton.registerEventHandlers();
                $('.favorite-btn').click();
                
                expect($('.favorite-btn')).not.toExist();
                expect($('.unfavorite-btn')).toExist();
            });
        });
        
        describe('when unfavoriting', function(){
            beforeEach(function(){
                loadFixtures('friends/unfavorite-button.html');
            });
            
            it('should post the unfavorite to the server', function(){
                spyOn(jQuery, 'post').and.callFake(function(url, data, done){
                    expect(url).toBe('/favorites/delete');
                    expect(data).toEqual({'friendId': 1});
                    
                    done();
                });
                
                this.favoriteButton.registerEventHandlers();
                $('.unfavorite-btn').click();
                
                expect(jQuery.post).toHaveBeenCalled();
            });
            
            it('should replace the buton with a favorite button', function(){
                spyOn(jQuery, 'post').and.callFake(function(url, data, done){
                    done();
                });
                
                this.favoriteButton.registerEventHandlers();
                $('.unfavorite-btn').click();
                
                expect($('.unfavorite-btn')).not.toExist();
                expect($('.favorite-btn')).toExist();
            });
        });
    });
});
