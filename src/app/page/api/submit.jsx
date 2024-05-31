import clientPromise from "../../../utils/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, score } = req.body;
    if (!name || !score) {
      return res.status(400).json({ error: "Name and score are required" });
    }

    const client = await clientPromise;
    const db = client.db();

    try {
      await db.collection("scores").insertOne({ name, score });
      return res.status(200).json({ message: "Score submitted" });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
