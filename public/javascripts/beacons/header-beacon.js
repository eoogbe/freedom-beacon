var FREE = FREE || {};

FREE.HeaderBeacon = (function(){
    function init($parent) {
        $parent.html('<button class="btn btn-primary group-end header-beacon" type="button">illuminate beacon</button>');
        
        $('.header-beacon').click(function(){
            var timerHtml = '<input type="number" max="60" min="1" value="30" name="header-timer" class="group-end" autofocus>';
            $parent.html(timerHtml);
            $parent.submit(function(){
                $headerTimer = $('[name="header-timer"]');
                $.post('/beacons', {'mainTimer': $headerTimer.val()}, function(){
                    $parent.html('<input type="button" class="btn btn-default" data-min="' + $headerTimer.val() + '" data-sec="0" name="header-timer-btn" value="' + $headerTimer.val() + ':00">');
                    var freeTimerHeader = FREE.HeaderTimer;
                    freeTimerHeader.init();
                    freeTimerHeader.run();
                });
            });
        });
    }
    
    return {'init': init};
})();
