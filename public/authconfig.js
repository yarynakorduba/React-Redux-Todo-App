var firebaseConfig = {
    apiKey: "AIzaSyAs68TQICN8IG2YOsdsw7QFwy6RPsAgiMY",
    authDomain: "my-redux-app-23a4d.firebaseapp.com",
    databaseURL: "https://my-redux-app-23a4d.firebaseio.com",
    projectId: "my-redux-app-23a4d",
    storageBucket: "my-redux-app-23a4d.appspot.com",
    messagingSenderId: "776109426165"

  };
firebase.initializeApp(firebaseConfig);


export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebase.auth();
export const firebaseDb = firebase.database();