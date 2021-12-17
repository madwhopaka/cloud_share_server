import nodemailer from "nodemailer";

const emailMan = nodemailer;
console.log(process.env.MAIL_PASS, process.env.MAIL_USER, process.env.SMTP_PORT);
 async function sendEmail({ from, to, subject, text, html }) {
  console.log(from,to) ; 
  const transporter = emailMan.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: { user:process.env.MAIL_USER, pass:process.env.MAIL_PASS },
  });
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }})
  let info = await transporter.sendMail({ from : `ShareCloud<${from}>`, to, subject, text, html });
  console.log(info) ; 
};

export  {sendEmail};
