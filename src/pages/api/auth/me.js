// pages/api/auth/me.js
import pool from "../../../lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get the JWT from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the JWT
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Extract the user ID from the decoded token
    const userId = decodedToken.userId;

    // Fetch the user data from the database
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users WHERE uid = $1", [
      userId,
    ]);
    client.release();

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // Return the user data
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error verifying token or fetching user:", error);
    res
      .status(401)
      .json({ message: "Unauthorized: Invalid token", error: error.message });
  }
}
