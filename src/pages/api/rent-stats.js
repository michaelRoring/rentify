import admin from "firebase-admin";
// import serviceAccountKey from "@/config/serviceAccountKey.json";

// Inisialisasi admin SDK dengan credential dari project Firebase Anda
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL:
      "https://rentify-chat-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  });
}

const MAX_INCREMENT = 30; // Maksimum penambahan nilai acak per hari
const NODE_INCREMENT = Math.floor(Math.random() * 2) + 2; // Jumlah penambahan node

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const snapshot = await admin.database().ref("stats").once("value");
      const data = snapshot.val();
      if (!data) {
        res.status(200).json({
          averageRentCost: 0,
          averageRentDuration: 0,
          totalNodes: 0,
          totalRentDuration: 0,
        });
      }
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching rental stats:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "POST") {
    try {
      const ref = admin.database().ref("stats");
      const snapshot = await ref.once("value");
      let data = snapshot.val();

      // Inisialisasi data jika tidak ada
      if (!data) {
        data = {
          averageRentDuration: 0,
          totalRentDuration: 0,
          averageRentCost: 0,
          totalNodes: 0,
        };
      }

      // Perbarui data dengan nilai-nilai yang ditambah dengan angka acak (maksimum 30 jam per hari)
      const newData = {
        averageRentDuration: Math.floor(
          data.averageRentDuration +
            Math.min(Math.random() * 100, MAX_INCREMENT)
        ),
        totalRentDuration: Math.floor(
          data.totalRentDuration +
            Math.min(Math.random() * 10000, MAX_INCREMENT * 100)
        ), // Maksimum penambahan 3000 jam per hari
        averageRentCost: Math.floor(
          data.averageRentCost + Math.min(Math.random() * 50, MAX_INCREMENT / 2)
        ), // Maksimum penambahan 15 per hari
        totalNodes: data.totalNodes + NODE_INCREMENT, // Menambah total nodes
      };

      await ref.set(newData);
      res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
      console.error("Error updating rental stats:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
