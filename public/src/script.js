import "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth-compat.js";
import "https://www.gstatic.com/firebasejs/10.9.0/firebase-database-compat.js";
import "https://www.gstatic.com/firebasejs/ui/6.0.1/firebase-ui-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCOmDjgSjP1CtLIkg1ynkJD5ShHv99Wup4",
    authDomain: "dwm-atividade1-1f86b.firebaseapp.com",
    databaseURL: "https://dwm-atividade1-1f86b-default-rtdb.firebaseio.com",
    projectId: "dwm-atividade1-1f86b",
    storageBucket: "dwm-atividade1-1f86b.appspot.com",
    messagingSenderId: "25966679785",
    appId: "1:25966679785:web:f901cf197f512c98a7c278"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
 // Initialize Realtime Database and get a reference to the service
const database = firebase.database(app);

document.getElementById("dashboard").style.display = "none";
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth(app));
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            console.log("User successfully signed in!");
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            document.getElementById("login").style.display = "none";
            document.getElementById("dashboard").style.display = "block";
            userAuthorized();
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            //document.getElementById('loader').style.display = 'none';
        }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    //signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
};
ui.start('#firebaseui-auth-container', uiConfig);

function userAuthorized() {
    document.getElementById("Forno1Temp").innerHTML = getTemperature('Forno1');
    changeBackgroundColor("Forno1Temp", getTemperature('Forno1'));
    document.getElementById("Forno2Temp").innerHTML = getTemperature('Forno2');
    changeBackgroundColor("Forno2Temp", getTemperature('Forno2'));
    document.getElementById("Forno3Temp").innerHTML = getTemperature('Forno3');
    changeBackgroundColor("Forno3Temp", getTemperature('Forno3'));
    document.getElementById("Forno4Temp").innerHTML = getTemperature('Forno4');
    changeBackgroundColor("Forno4Temp", getTemperature('Forno4'));
}

function changeBackgroundColor(fornoId, temperature) {
    if (temperature < 537) {
        document.getElementById(fornoId).style.backgroundColor = "#8c7373" // rgb(140, 115, 115);
    } else if (temperature >= 537 && temperature < 815) {
        document.getElementById(fornoId).style.backgroundColor = "#cc0000" // rgb(204, 0, 0);
    } else if (temperature >= 815 && temperature < 980) {
        document.getElementById(fornoId).style.backgroundColor = "#ff8833" // rgb(255, 136, 51);
    } else if (temperature >= 980 && temperature <= 1100) {
        document.getElementById(fornoId).style.backgroundColor = "#fff700" // rgb(255, 247, 0);
    } else {
        document.getElementById(fornoId).style.backgroundColor = "#ffffff" // white
    }
}

// param: fornoPath
function getTemperature(forno) {
    let temperature;
    firebase.database().ref('/' + forno + '/temp').on('value', (snapshot) => {
        temperature = snapshot.val();
    });
    return temperature;
}