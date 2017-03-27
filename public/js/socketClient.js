window.mainrtc.socketClient = (function(){
    var socket = io.connect();
    function initSocket(){

        this.userLogin = {};
        this.connectedUser = null;
    }
    socket.on('message', socketEventHandler);


    function send(message){
        if (this.connectedUser) message.name = this.connectedUser;
        this.socket.send(message);
    }

    return {
        'initSocket' : initSocket,
        'send' : send
    }
})();