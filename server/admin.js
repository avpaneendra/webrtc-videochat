var admin = require('firebase-admin');

function initAdmin(mode){
    var serviceAccount = mode ? serviceProduction() : serviceDevelopment();
    admin.initializeApp(
        {
            credential:admin.credential.cert(serviceAccount),
            dataBaseUrl:"https://web-rtc-cfabc.firebaseio.com"
        });
}
function serviceProduction(){
    return {
        "type": process.env.type,
        "project_id": process.env.project_id,
        "private_key_id": process.env.private_key_id,
        "private_key": process.env.private_key.replace(/\\n/g, '\n'),
        "client_email": process.env.client_email,
        "client_id": process.env.client_id,
        "auth_uri": process.env.auth_uri,
        "token_uri": process.env.token_uri,
        "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
        "client_x509_cert_url": process.env.client_x509_cert_url
    };
}
function serviceDevelopment(){
    var serviceDevelopment = require('./web-rtc-cfabc-firebase-adminsdk-dpqoj-ff19ebceff.json');
    return serviceDevelopment;
}
function verifyToken(idToken){
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            var uid = decodedToken.uid;
            console.log(uid);
        }).catch(function(error) {
        // Handle error
    });
}
exports.initAdmin = initAdmin;
exports.verifyToken = verifyToken;