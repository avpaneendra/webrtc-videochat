/**
 * Created by artem on 17/02/2017.
 */
window.mainrtc.database = (function(){
    var config = {
        apiKey: "AIzaSyA8gZeCmugvW3-1zL01c-HPH6T_HX4ywDI",
        authDomain: "web-rtc-cfabc.firebaseapp.com",
        databaseURL: "https://web-rtc-cfabc.firebaseio.com",
        storageBucket: "web-rtc-cfabc.appspot.com",
        messagingSenderId: "737526689875"
    };
    function initFirebase(){
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(userStateChanged);
    }
    function toggleAuth(){
        if(!firebase.auth().currentUser){
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
            }).catch(function(error) {
                console.error(error);
            });
        } else {
            firebase.auth().signOut();
            mainrtc.connectionP2P.signOut();
        }
    }
    function userStateChanged(user) {
        if (user) {
            document.getElementById('google_state').textContent = 'Sign Out';
            document.getElementById('user_login').textContent = user.displayName;
            send(JSON.stringify({type: "login", name: user.displayName, uid: user.uid}));
            console.log("onAuthStateChanged",user.displayName);
        } else {
            document.getElementById('google_state').textContent = 'Sign In';
            document.getElementById('user_login').textContent = "";
        }
    }
    return{
        'initFirebase' : initFirebase,
        'toggleAuth' : toggleAuth
    }
})();




