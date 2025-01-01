import pool from "../../../lib/db";
import jwt from "jsonwebtoken";
import { generateAvatarURL } from "@/utils/generateAvatarUrl";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { wallet_address } = req.body;

  if (!wallet_address) {
    return res.status(400).json({ message: "Wallet address is required" });
  }

  let client;
  try {
    client = await pool.connect();

    const existingUserResult = await client.query(
      "SELECT * FROM users WHERE wallet_address = $1",
      [wallet_address]
    );

    if (existingUserResult.rows.length > 0) {
      const user = existingUserResult.rows[0];
      const token = jwt.sign({ userId: user.uid }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ user, token });
    } else {
      const avatar = generateAvatarURL();
      const newUserResult = await client.query(
        "INSERT INTO users (wallet_address, avatar_url) VALUES ($1, $2) RETURNING *",
        [wallet_address, avatar]
      );
      const newUser = newUserResult.rows[0];
      const token = jwt.sign({ userId: newUser.uid }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(201).json({ user: newUser, token });
    }
  } catch (error) {
    console.error("Error logging in or creating user:", error);
    res.status(500).json({
      message: "Error logging in or creating user",
      error: error.message,
    });
  } finally {
    if (client) {
      client.release();
    }
  }
}
