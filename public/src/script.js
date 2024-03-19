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
    /////// First module: First module: Oven's temperatures
    getFirebaseData('Forno1', 'temp', (temperature) => {
        document.getElementById("Forno1Temp").innerHTML = temperature;
        changeBackgroundColor("Forno1Color", temperature);
    });
    getFirebaseData('Forno2', 'temp', (temperature) => {
        document.getElementById("Forno2Temp").innerHTML = temperature;
        changeBackgroundColor("Forno2Color", temperature);
    });
    getFirebaseData('Forno3', 'temp', (temperature) => {
        document.getElementById("Forno3Temp").innerHTML = temperature;
        changeBackgroundColor("Forno3Color", temperature);
    });
    getFirebaseData('Forno4', 'temp', (temperature) => {
        document.getElementById("Forno4Temp").innerHTML = temperature;
        changeBackgroundColor("Forno4Color", temperature);
    });

    /////// Second module: Oven's status
    // Status
    getFirebaseData('Forno1', 'status', (status) => {
        document.getElementById("Forno1Status").src = getStatusIcon(status);
    });
    getFirebaseData('Forno2', 'status', (status) => {
        document.getElementById("Forno2Status").src = getStatusIcon(status);
    });
    getFirebaseData('Forno3', 'status', (status) => {
        document.getElementById("Forno3Status").src = getStatusIcon(status);
    });
    getFirebaseData('Forno4', 'status', (status) => {
        document.getElementById("Forno4Status").src = getStatusIcon(status);
    });
    // Notes
    getFirebaseData('Forno1', 'obs', (note) => {
        document.getElementById("Forno1Note").innerHTML = note;
    });
    getFirebaseData('Forno2', 'obs', (note) => {
        document.getElementById("Forno2Note").innerHTML = note;
    });
    getFirebaseData('Forno3', 'obs', (note) => {
        document.getElementById("Forno3Note").innerHTML = note;
    });
    getFirebaseData('Forno4', 'obs', (note) => {
        document.getElementById("Forno4Note").innerHTML = note;
    });
}

/**
 * 
 * @param {string} ovenId The oven ID 
 * @param {number} temperature The temperature from the oven
 */
function changeBackgroundColor(ovenId, temperature) {
    if (temperature < 537) {
        document.getElementById(ovenId).style.backgroundColor = "#8c7373" // rgb(140, 115, 115);
    } else if (temperature >= 537 && temperature < 815) {
        document.getElementById(ovenId).style.backgroundColor = "#cc0000" // rgb(204, 0, 0);
    } else if (temperature >= 815 && temperature < 980) {
        document.getElementById(ovenId).style.backgroundColor = "#ff8833" // rgb(255, 136, 51);
    } else if (temperature >= 980 && temperature <= 1100) {
        document.getElementById(ovenId).style.backgroundColor = "#fff700" // rgb(255, 247, 0);
    } else {
        document.getElementById(ovenId).style.backgroundColor = "#ffffff" // white
    }
}

/**
 * 
 * @param {string} oven The oven ID
 * @param {string} data The param data from the oven ID
 * @param {string} callback Callback for accessing the variable value
 */
function getFirebaseData(oven, data, callback) {
    firebase.database().ref('/' + oven + '/' + data).on('value', (snapshot) => {
        const data = snapshot.val();
        callback(data);
    });
}

/**
 * 
 * @param {number} status Number status (0: ok, 1: error on PID, 2: emergency button pressed)
 * @returns 
 */
function getStatusIcon(status) {
    if (status == 0) {
        return '/assets/images/status-ok.png';
    } else if (status == 1) {
        return '/assets/images/status-warning.png';
    } else if (status == 2) {
        return '/assets/images/status-alert.png';
    } else {
        console.error("Error! Invalid status value.");
        return null;
    }
}