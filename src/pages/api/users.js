import pool from "../../lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  console.log("API HIT!");
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const client = await pool.connect();
    const result = await client.query("SELECT * FROM users");
    client.release();
    res.status(200).json(result.rows);
    console.log("result.rows :", result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
}
