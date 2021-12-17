import express from "express"; 
import connectDb from "./config/db.js" ; 
import files from './routes/files.js' ; 
import show from './routes/show.js' ; 
import download from './routes/download.js' ; 
import path from 'path';




const app  = express() ; 

connectDb() ;
const __dirname = path.resolve();
app.use(express.static('public')) ;
app.use(express.json()) ;  
app.set('views', path.join(__dirname, '/views')); 
app.set('view engine', 'ejs'); 
app.use('/api/files', files.router); 
app.use('/files',show.router);
app.use('/files/download', download.router);
app.get('/', (req,res) => {
    return res.send(<h1>Welcome to the backend server Cloud share : Check out the creators github account : github.com/madwhopaka</h1>); 
}); 



const PORT = process.env.PORT || 5000 ;

app.listen(PORT, ()=>{
    console.log(`The server is running on PORT : ${PORT}`); 
  
})

