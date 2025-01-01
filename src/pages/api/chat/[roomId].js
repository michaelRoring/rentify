import { db } from "../firebase.js";

export default async function handler(req, res) {
  const { roomId } = req.query;
  const { method } = req;

  if (!roomId || typeof roomId !== "string") {
    return res.status(400).json({ error: "Invalid room ID" });
  }

  if (method === "GET") {
    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
      res.setHeader("Pragma", "no-cache");
      res.setHeader("Expires", "0");
      res.setHeader("Connection", "keep-alive");
      res.flushHeaders();

      const messagesRef = db.ref(`chats/${roomId}/messages`);

      const sendMessages = (snapshot) => {
        const messages = snapshot.val()
          ? Object.entries(snapshot.val()).map(([key, value]) => ({
              id: key,
              ...value,
            }))
          : [];
        res.write(`data: ${JSON.stringify(messages)}\n\n`);
        res.flush();
      };

      const initialSnapshot = await messagesRef.once("value");
      sendMessages(initialSnapshot);

      const messageListener = messagesRef.on("value", (snapshot) => {
        sendMessages(snapshot);
      });

      req.on("close", () => {
        messagesRef.off("value", messageListener);
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.write(
        `data: ${JSON.stringify({
          error: "Failed to fetch messages",
          details: error.message,
        })}\n\n`
      );
      res.end();
    }
  } else if (method === "POST") {
    try {
      const newMessage = {
        text: req.body.text,
        sender: req.body.sender,
        timestamp: Date.now(),
      };

      const roomRef = db.ref(`chats/${roomId}/messages`);
      await roomRef.push(newMessage);

      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
