import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAM_FcyETtFtvHM3iifSupJbLRQ7cz7Ijo",
    authDomain: "nfl-predictions-45c7f.firebaseapp.com",
    databaseURL: "https://nfl-predictions-45c7f.firebaseio.com",
    projectId: "nfl-predictions-45c7f",
    storageBucket: "nfl-predictions-45c7f.appspot.com",
    messagingSenderId: "117667738220"
  };


  firebase.initializeApp(config);
  firebase.firestore().settings({timestampsInSnapshots: true})

  export default firebase;
