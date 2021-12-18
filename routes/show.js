import express from 'express'; 
import File from "../models/file.js" ; 

const router = express.Router() ; 


router.get('/:uuid', async (req,res)=> {
 
  try {
       
       const  fyl =  await File.findOne({uuid:req.params.uuid}
       );
       

    console.log(fyl.filename,fyl.size, fyl.path);
       if(!fyl) {
           return res.render("download", {error: "Humare paas nahi hai voh file"}); 
       }
       else {
        console.log(`${process.env.BASE_APP_URL}/files/download/${fyl.uuid}`); 
        return  res.render('download', {
            uuid : fyl.uuid, 
            fileSize: fyl.size, 
            fileName : fyl.filename, 
            download : `files/download/${fyl.uuid}`
        })
       }
   }
    catch (err) {
        console.log(err) ; 
            return  res.render('download', {error: "Kuch toh hua hai, kuch ho gya hai "}) ;
    }



})

export default {router}
