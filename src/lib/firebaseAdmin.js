// lib/firebaseAdmin.js
import admin from 'firebase-admin';
import serviceAccount from '@/config/serviceAccountKey.json'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://rentify-chat-app-default-rtdb.asia-southeast1.firebasedatabase.app"
  });
}

export default admin;
