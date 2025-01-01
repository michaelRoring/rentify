// pages/api/test.js
import { db } from "../firebase.js";
import { ref, get } from "firebase/database";

export default async function handler(req, res) {
  try {
    const testRef = ref(db, "chats/room_1/messages"); // Replace with a known path
    const snapshot = await get(testRef);
    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to read data" });
  }
}
