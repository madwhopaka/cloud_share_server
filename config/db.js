import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export default async function connectDB() {

    //Database Connection : 

    
        mongoose.connect(process.env.MONGO_CONNECTION_URL)
         const connection = mongoose.connection;
         console.log(connection.readyState) ;
        
         connection.once('open', (res) => {
             console.log("Db is connected");
             
         });
         console.log(connection.readyState) ;
    
   

}