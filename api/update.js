import { connectDatabase, client } from "../db/dbConnection.js";

export default async function handler(req, res) {
  try {
    await connectDatabase();

    // Check time
    const hour = new Date().getHours();
    const statusText = hour >= 12 ? "Evening" : "Morning";

    console.log("CRON TRIGGERED AT:", new Date().toISOString());

    const result = await client.query(
      "UPDATE active SET active=$1 WHERE id=$2",
      [statusText, 1]
    );

    return res.status(200).json({
      message: `Updated to ${statusText}`,
      result,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}


