/**
 * Created by artem on 18/02/2017.
 */
window.mainrtc.UI = (function(){

    function initInterface(){
        var self = this;
        self.userLoginInput = document.getElementById("userLoginInput");
        self.userLoginBtn = document.getElementById("userLoginBtn");
        self.userNameRemoteInput = document.getElementById("userNameRemoteInput");
        self.userCallRemoteBtn = document.getElementById("userCallRemoteBtn");
        self.userHangUpBtn = document.getElementById("userHangUpBtn");
        listenersUI.call(this);
    }

    function listenersUI(){
        this.userLoginBtn.addEventListener('click', userLoginHandler.bind(this));
        this.userCallRemoteBtn.addEventListener('click', userCallHandler.bind(this));
        this.userHangUpBtn.addEventListener('click', userHangUpHandler);
        document.querySelector("#userSelfieBtn").addEventListener("click", userScreenShotHandler.bind(this));
    }
    function userLoginHandler(){
        userLogin = this.userLoginInput.value;
        var inputCorrect = mainrtc.socketTool.isInputCorrect(userLogin);
        if(inputCorrect) send(JSON.stringify({type: "login", name: userLogin}));
        else console.log("error user login");
    }
    function userCallHandler(){
        var userNameRemote = this.userNameRemoteInput.value;
        var inputCorrect = mainrtc.socketTool.isInputCorrect(userNameRemote);
        if(inputCorrect) mainrtc.connectionP2P.startPeerConnection(userNameRemote);
        else console.log("error remote user name");
    }
    function userHangUpHandler(){
        send(JSON.stringify({type: "leave", name: userLogin}));
        mainrtc.connectionP2P.onLeave();
    }
    function userScreenShotHandler(event){
        this.screenShot();
    }
    function screenShot(){
        var video = document.querySelector("#local"),
            canvas = document.querySelector("canvas");
        console.log(video.videoHeight  + " " + video.videoWidth);
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        var context = canvas.getContext("2d");
        context.drawImage(video,0,0);
    }
    return {
        'initInterface' : initInterface,
        'screenShot' : screenShot
    }

})();