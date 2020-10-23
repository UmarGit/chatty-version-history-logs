import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyBDrjn4dAQ0meN8UqyUUJmcs8fJu6_OzBE",
    authDomain: "twilio-test-e862f.firebaseapp.com",
    databaseURL: "https://twilio-test-e862f.firebaseio.com",
    projectId: "twilio-test-e862f",
    storageBucket: "twilio-test-e862f.appspot.com",
    messagingSenderId: "781173471090",
    appId: "1:781173471090:web:928e39b2312271a1978feb",
    measurementId: "G-BNZCR4N8YV"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var database = firebase.database()

function writeUserData(id, number) {
    database.ref('data/'+id).set({
        id,
        number
    });
}

function deleteUserData(id) {
    database.ref('data/'+id).remove()
}
export {writeUserData, deleteUserData}