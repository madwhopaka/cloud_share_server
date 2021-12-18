import File from "./models/file.js";
import fs from "fs";
import connectDb from "./config/db.js";

connectDb();

async function fetchData() {
  const pastDate = new Date(Date.now() - 1000 * 60 * 24 * 60);
  const files = await File.find({ createdAt: { $lt: pastDate } });

  if (files.length) {
    for (const file of files) {
        
      try {
        console.log(file.filename) ; 
        fs.unlinkSync(file.path);
        await file.remove();
        console.log("File removed successfully.");
      } catch (err) {
        console.log(`File could not be  deleted. because: ${err} `);
      }
    }
    console.log("Job done"); 
  }
}

fetchData().then(process.exit); 

