import express from "express";
import multer from "multer";
import path from "path";
import File from "../models/file.js";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import {sendEmail} from "../services/emailFn.js";
import {temp}  from "../services/emailTemp.js" ; 
//  


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniquename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniquename);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("myfile");

const router = express.Router();

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    const file = new File({
      filename: req.file.filename,
      uuid: uuid(),
      path: req.file.path,
      size: req.file.size,
    });
    console.log(file.filename, file.path, file.size);
    const response = await file.save();

    return res.json({
      file: `${process.env.BASE_APP_URL}/files/${response.uuid}`,
    });
  });
});

router.post("/send", async (req, res) => {
  console.log(req.body) ; 
  const { uuid, emailTo, emailFrom } = req.body;

  if (!uuid || !emailTo || !emailFrom) {
    res.status(400).send("All fields are required");
  }

  const file = await File.findOne({ uuid: uuid });
  console.log(file); 

  file.sender = emailFrom;
  file.reciever = emailTo;
  const response = await file.save();
  
  
   sendEmail({
    from: emailFrom,
    to: emailTo,
    subject: "CloudShare file share link",
    text: `${emailFrom} share a file link with you. `,
    html:temp({emailFrom: emailFrom, download: `${process.env.BASE_APP_URL}/files/${file.uuid}`, size: parseInt(file.size/1000)+"KB", expires: '24 hours'} ),
  });

  return res.send({message: "Email already sent"}) ; 
});


export default { router };
