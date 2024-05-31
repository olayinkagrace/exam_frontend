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
      const existingUser = await db.collection("users").findOne({ name });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      await db.collection("users").insertOne({ name, password });
      return res.status(200).json({ message: "Signup successful" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
