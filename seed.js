// seedChat.js
import { db } from "./src/pages/api/firebase.js";
import admin from "firebase-admin";

async function seedChat() {
  try {
    for (let i = 1; i <= 2; i++) {
      const messagesRef = db.ref(`chats/room_${i}/messages`);

      const initialMessages = [
        {
          sender: "0x1aD2B053b8c6b1592cB645DEfadf105F34d8C6e1",
          text: "Hello everyone! This is the first message.",
          timestamp: admin.database.ServerValue.TIMESTAMP,
        },
        {
          sender: "0x1aD2B053b8c6b1592cB645DEfadf105F34d8C621",
          text: "Hi there! Glad to be here.",
          timestamp: admin.database.ServerValue.TIMESTAMP,
        },
        {
          sender: "0x1aD2B053b8c6b1592cB645DEfadf105F34d8C6e1",
          text: "How is everyone doing today?",
          timestamp: admin.database.ServerValue.TIMESTAMP,
        },
        {
          sender: "0x1aD2B053b8c6b1592cB645DEfadf105F34d8C621",
          text: "I am doing great, thanks for asking!",
          timestamp: admin.database.ServerValue.TIMESTAMP,
        },
        // Add more messages here
      ];

      for (const message of initialMessages) {
        await messagesRef.push().set(message);
        console.log(
          `Message from ${message.sender.substring(
            0,
            4
          )}...${message.sender.substring(
            message.sender.length - 4,
            message.sender.length
          )} seeded successfully.`
        );
      }
    }

    console.log("All initial chat messages seeded successfully!");
  } catch (error) {
    console.error("Error seeding chat messages:", error);
  }
}

seedChat();
