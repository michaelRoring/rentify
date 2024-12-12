// utils/firebase.js

// import firebase from 'firebase/app';
// import 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyC5yi52ibAebUNyC9cE81nMJgMkB9ysEAU",
  authDomain: "rentify-chat-app.firebaseapp.com",
  databaseURL: "https://rentify-chat-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rentify-chat-app",
  storageBucket: "rentify-chat-app.appspot.com",
  messagingSenderId: "30254816473",
  appId: "1:30254816473:web:4beb43f8308fa3878932c8"
};

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
// export const auth = firebase.auth();
// export const database = firebase.database();
