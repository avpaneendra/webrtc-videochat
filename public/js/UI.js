/**
 * Created by artem on 18/02/2017.
 */
window.mainrtc.UI = (function(){

    function initInterface(){
        var self = this;
        self.userList = [];
        self.userNameRemoteInput = document.getElementById("userNameRemoteInput");
        self.userCallRemoteBtn = document.getElementById("userCallRemoteBtn");
        self.userHangUpBtn = document.getElementById("userHangUpBtn");
        listenersUI.call(this);
    }

    function listenersUI(){
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
    function userCall(name){
        if(name != null) mainrtc.connectionP2P.startPeerConnection(name);

    }
    function userHangUpHandler(event){
            mainrtc.connectionP2P.onLeave();
            send(JSON.stringify({type: "leave", signOut: false}));
    }
    function filterUserList(data){
        var self = this;
        var userList = data.list.filter( user => {if(Object.keys(user)[0] !== data.caller.uid ) return user});
        self.userList = userList.map(user => {
            var id = Object.keys(user);
            var name = Object.values(user);
            return {name: name, id: id}
        });
        //self.userList = data.list;
        window.dispatchEvent(new CustomEvent('userList'));
        //console.log(self.userList);
    }
    function removeUserList(){
        clearInterval(mainrtc.UI.intervalUserList);
        mainrtc.UI.userList = [];
        window.dispatchEvent(new CustomEvent('userList'));
    }
    function userScreenShotHandler(event){
        this.screenShot();
    }
    function screenShot(){
        var video = document.querySelector("#local"),
            canvas = document.querySelector("#photo-canvas");
        console.log(video.videoHeight  + " " + video.videoWidth);
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;

        var context = canvas.getContext("2d");
        context.drawImage(video,0,0);
    }
    function requestUsers(){
        this.intervalUserList = setInterval(function(){
            send(JSON.stringify({type: "users"}));
        },10000);
    }
    return {
        'initInterface' : initInterface,
        'filterUserList' : filterUserList,
        'screenShot' : screenShot,
        'requestUsers' : requestUsers,
        'removeUserList' : removeUserList,
        'userCall' : userCall
    }

})();