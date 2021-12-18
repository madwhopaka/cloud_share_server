import express from 'express' ; 
import File from '../models/file.js' ; 
import path from 'path' ; 

const router = express.Router() ; 

router.get('/:uuid', async (req,res,next)=> {
    var pathUrl = req.path;
    const file = await File.findOne({uuid: req.params.uuid});

    if(!file) return res.render('download', {error: "Link expire ho gya"});
    console.log(file)
    var __dirname = path.resolve() ; 
    const filePath = `./${file.path}`;
    console.log(filePath) ;
   
    if(pathUrl !== '/') {
        res.download(filePath, file.filename, (err)=>{console.log(`The error is : ${err}`)}) ; 
   } else {
       next();
   }
})

export default {router}
