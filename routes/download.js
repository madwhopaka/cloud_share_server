import express from 'express' ; 
import File from '../models/file.js' ; 
import path from 'path' ; 

const router = express.Router() ; 

router.get('/:uuid', async (req,res)=> {

    const file = await File.findOne({uuid: req.params.uuid});

    if(!file) return res.render('download', {error: "Link expire ho gya"});
    console.log(file)
    
    const filePath = `${__dirname}\\${file.path}`;
    console.log(filePath) ; 
    res.download(filePath) ; 
    
    
    res.download(filePath) ; 
    

})

export default {router}
