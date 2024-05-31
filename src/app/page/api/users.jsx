import clientPromise from "../../../utils/dbConnect";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const client = await clientPromise;
    const db = client.db();

    try {
      const users = await db.collection("scores").find().toArray();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
