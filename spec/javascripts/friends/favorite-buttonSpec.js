describe('FavoriteButton', function(){
    describe('registerEventHandlers()', function(){
        var favoritesButton;
        
        beforeEach(function(){
            favoriteButton = FREE.FavoriteButton;
            favoriteButton.init();
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
                
                favoriteButton.registerEventHandlers();
                $('.favorite-btn').click();
                
                expect(jQuery.post).toHaveBeenCalled();
            });
            
            it('should replace the buton with an unfavorite button', function(){
                spyOn(jQuery, 'post').and.callFake(function(url, data, done){
                    done();
                });
                
                favoriteButton.registerEventHandlers();
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
                
                favoriteButton.registerEventHandlers();
                $('.unfavorite-btn').click();
                
                expect(jQuery.post).toHaveBeenCalled();
            });
            
            it('should replace the buton with a favorite button', function(){
                spyOn(jQuery, 'post').and.callFake(function(url, data, done){
                    done();
                });
                
                favoriteButton.registerEventHandlers();
                $('.unfavorite-btn').click();
                
                expect($('.unfavorite-btn')).not.toExist();
                expect($('.favorite-btn')).toExist();
            });
        });
    });
});