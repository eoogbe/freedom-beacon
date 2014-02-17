var FREE = FREE || {};

FREE.MessageForm = (function(){
    function clearInput() {
        $("input[name='message']").val("");
    }
    
    function appendMessage(message, type) {
        $.get("/partials/conv-item", {
            "message": message,
            "type": type
        }, function(data){
            $("#messages-box").append(data);
        });
    }
    
    function messageWritten(e) {
		e.prevenDefault();
		
        var usrMsg = $("input[name='message']").val();
		appendMessage(usrMsg, "user");
        clearInput();
		
		setTimeout(appendMessage, 3000, "Friend's reply", "friend");
    }
    
    function registerEventHandlers() {
        $('form[name="message-form"]').submit(messageWritten);
    }
    
    return {
        'init': function(){},
        'registerEventHandlers': registerEventHandlers
    };
})();