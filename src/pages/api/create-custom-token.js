import admin from 'firebase-admin';
import serviceAccountKey from '@/config/serviceAccountKey.json'
// Inisialisasi admin SDK dengan credential dari project Firebase Anda
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: 'https://rentify-chat-app-default-rtdb.asia-southeast1.firebasedatabase.app'
  });
}

export default async function handler(req, res) {
  const { walletAddress, email } = req.body;

  if (!walletAddress || !email) {
    return res.status(400).json({ error: 'Missing wallet address or email' });
  }

  try {
    // Buat custom token menggunakan wallet address sebagai UID
    const customToken = await admin.auth().createCustomToken(walletAddress, { email });
    res.status(200).json({ token: customToken });
  } catch (error) {
    console.error('Error creating custom token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
