import { connectDatabase, client } from "../db/dbConnection.js";

export default async function handler(req, res) {
  try {
    await connectDatabase();

 let key=new Date().getDay()
    let day="";
    switch (key) {
        case 1:
            day="Monday"
            break;
    
        case 2:
            day="Tuesday"
            break;
    
        case 3:
            day="Wednesday"
            break;
    
        case 4:
            day="Thursday"
            break;
    
        case 5:
            day="Friday"
            break;
    
        case 6:
            day="Saturday"
            break;
    
        case 7:
            day="Sunday"
            break;
    
        default:
            day="Error: Please pay attention to the problem."
            break;
    }

    console.log("CRON TRIGGERED AT:", new Date().toISOString());

    const result = await client.query(
      "UPDATE active SET active=$1 WHERE id=$2",
      [day, 1]
    );

    return res.status(200).json({
      message: `Updated to ${day}`,
      result,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}



