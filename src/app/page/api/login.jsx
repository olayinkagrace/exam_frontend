import bcrypt from "bcrypt";
import clientPromise from "../../../utils/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ error: "Name and password are required" });
    }

    const client = await clientPromise;
    const db = client.db();

    try {
      const user = await db.collection("users").findOne({ name });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
