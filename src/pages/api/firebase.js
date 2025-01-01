// src/pages/api/firebase.js
import admin from "firebase-admin";
import { config } from "dotenv";

config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

let firebaseApp;

if (!admin.apps.length) {
  firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
} else {
  firebaseApp = admin.app();
}

const db = firebaseApp.database();
const firestore = firebaseApp.firestore();

export { db, firestore };
