var FREE = FREE || {};

FREE.HeaderBeacon = (function(){
    function init($parent) {
        $parent.html('<button class="btn btn-primary group-end header-beacon" type="button">illuminate beacon</button>');
        
        $('.header-beacon').click(function(){
            var timerHtml = '<input type="number" max="60" min="1" value="30" name="header-timer" class="group-end" autofocus>';
            $parent.html(timerHtml);
            
            var countdowner = FREE.Countdowner;
			countdowner.init();
			countdowner.countdown($(timerHtml), init);
        });
    }
    
    return {'init': init};
})();
