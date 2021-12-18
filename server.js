import express from "express"; 
import connectDb from "./config/db.js" ; 
import files from './routes/files.js' ; 
import show from './routes/show.js' ; 
import download from './routes/download.js' ; 
import path from 'path';
import cors from 'cors'; 


const corsOptions  = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

const app  = express() ; 
app.use(cors(corsOptions));
connectDb() ;
const __dirname = path.resolve();
app.use(express.static('public')) ;
app.use(express.json()) ;  
app.set('views', path.join(__dirname, '/views')); 
app.set('view engine', 'ejs'); 
app.use('/api/files', files.router); 
app.use('/files',show.router);
app.use('/files/download', download.router);




const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=>{
    console.log(`The server is running on PORT : ${PORT}`); 
  
})

