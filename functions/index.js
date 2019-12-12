const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
const express = require('express');
var app = express();
const cors = require('cors')({origin: true});

admin.initializeApp();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

 let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'Your gmail',
      pass: 'you password'
  }
});

 
exports.email = functions.https.onRequest((req, res)=>{
  cors(req, res, () => {
var obj = JSON.parse(req.body);
const email = obj.email;

//////////////////////Using Gmail/////////////////////////////////
//comment this out if you want to use SendGrid

const mailOptions = {
    from: email, 
    subject: 'Holaaaa',
    html: '<p style="font-size: 16px;">'+ obj.message +'</p>'
};
return transporter.sendMail(mailOptions, (erro, info) => {
  if(erro){
    console.log(erro);
      return res.status(500).json({message: "ERROR"});
  }
  return res.status(200).json({message: "Senttttt"});
});

///////////////////////////////////////////////////////



 //this is to verify sendgrid integration

//sgMail.setApiKey('');
// const msg = {
//   to: 'test@example.com',
//   from: 'test@example.com',
//   subject: 'Sending with Twilio SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// };
// sgMail.send(msg);



});
});




//This is the class project code using SendGrid

// cors(req, res, () => {
//   //  res.status(200).json({
     
//   //         message: "inside funtion"
//   //     })
// var obj = JSON.parse(req.body);

// sgMail.setApiKey('');

// const msg = {
//               to: 'contact.swoladm@gmail.com',
//               from: obj.email,
//               subject: 'SWOL Contact',
//               text: obj.message,
//             //   html: '<strong></strong>',
//   };


// sgMail.send(msg).then(()=>{
//   console.log("sent");
//    res.status(200).json({
 
//       message: "Your email was sent!!!!"
//   })
//   // res.send("Email sent");
// }).catch((error)=>{
//     console.log('error', error);
//     res.status(500).json({
 
//       message: "Could not send email!!!"
//   })
// });

// });
      
   
