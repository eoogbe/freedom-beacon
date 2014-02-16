var FREE = FREE || {};

FREE.MainBeacon = (function(){
    var $beaconBtn
      , $timerLabel
      , countdowner = null;
    
    function toggleBeacon(btnText, readonly) {
        $beaconBtn.text(btnText);
        $timerLabel.prop('readonly', readonly);
    }
    
    function illuminateBeacon() {
        toggleBeacon('deactivate beacon', true);
        
        if (countdowner === null) {
            countdowner = FREE.Countdowner;
            countdowner.init();
        }
        
        countdowner.countdown($('input[name="main-timer"]'), illuminateBeacon);
    }
    
    function deactivateBeacon() {
        toggleBeacon('illuminate beacon', null);
        countdowner.stop();
    }
    
    function beaconToggled() {
        $beaconBtn.toggleClass('btn-primary');
        $beaconBtn.toggleClass('btn-default');
        $timerLabel.toggleClass('readonly');
        
        if ($(this).is(':checked')) {
            illuminateBeacon();
        } else {
            deactivateBeacon();
        }
    }
    
    function registerEventHandlers() {
        $('#beacon').change(beaconToggled);
    }
    
    function init() {
        $beaconBtn = $('.beacon-btn');
        $timerLabel = $('input[name="main-timer"]');
    }
    
    return {
        'init': init,
        'registerEventHandlers': registerEventHandlers
    };
})();