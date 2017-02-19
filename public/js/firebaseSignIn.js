/**
 * Created by artem on 18/02/2017.
 */
var uiConfig = {
    signInSuccessUrl: 'start',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
};
var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);
