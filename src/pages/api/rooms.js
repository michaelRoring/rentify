// import { db } from "../api/firebase.js";
// import { ref, get } from "firebase/database";

// export default async function handler(req, res) {
//   const { method } = req;

//   if (method === "GET") {
//     try {
//       const chatsRef = ref(db, "chats");
//       const snapshot = await get(chatsRef);

//       if (snapshot.exists()) {
//         const roomIds = [];
//         snapshot.forEach((childSnapshot) => {
//           roomIds.push(childSnapshot.key);
//         });
//         res.status(200).json(roomIds);
//       } else {
//         res.status(404).json({ message: "Data not found" });
//       }
//     } catch (error) {
//       console.error("Error fetching rooms:", error);
//       res.status(500).json({ error: "Failed to fetch rooms" });
//     }
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }

import { db } from "../api/firebase.js";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      // Using Admin SDK methods: .ref() and .once()
      const chatsRef = db.ref("chats");
      const snapshot = await chatsRef.once("value");

      const roomIds = snapshot.val() ? Object.keys(snapshot.val()) : [];
      res.status(200).json(roomIds);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      res.status(500).json({
        error: "Failed to fetch rooms",
        details: error.message,
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
