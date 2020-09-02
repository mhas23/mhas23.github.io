import * as firebase from "firebase/app";
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC6t3rBFVOuOzP3zSX37CW7nBo-u6mVGDM",
    authDomain: "movie-database-faf15.firebaseapp.com",
    databaseURL: "https://movie-database-faf15.firebaseio.com",
    projectId: "movie-database-faf15",
    storageBucket: "movie-database-faf15.appspot.com",
    messagingSenderId: "733450612321",
    appId: "1:733450612321:web:7ba9132bfba7b0b4758420",
    measurementId: "G-NQM7J4DS3S"
};
// Initialize Firebase
class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
        this.auth = firebase.auth()
        this.db = firebase.database();

    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInAnonymously = () =>
        this.auth.signInAnonymously();

    doSignOut = () => this.auth.signOut()

    doDeleteAccount = () => this.auth.currentUser.delete()


    doReauthenticate = (email, password) => 
        this.auth.currentUser.reauthenticateWithCredential(firebase.auth.EmailAuthProvider(email, password)) 

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    user = uid => this.db.ref(`users/${uid}`);
    getUser = uid => this.db.ref(`users/${uid}`).once('value')
    item = uid => this.db.ref(`users/${uid}/favorites`);
    childItems = (key, uid) => this.db.ref(`users/${uid}/favorites`).child(key).remove();
    checkItem = uid => this.db.ref(`users/${uid}/favorites`).once('value')
    pushItem = () => this.db.ref.child.push()
    users = () => this.db.ref('users');
    favorites = (uid, id) => this.db.ref(`users/${uid}/favorites`).once("value", snap => {
        
      });

   }


export default Firebase


