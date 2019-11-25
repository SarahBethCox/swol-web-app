const functions = require('firebase-functions');
var bodyParser = require('body-parser');
const express = require('express');
var app = express();

 const cors = require('cors')({origin: true});


 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());

 const sgMail = require('@sendgrid/mail');

 
exports.email = functions.https.onRequest((req, res)=>{
       cors(req, res, () => {
         res.status(200).json({
           
                message: "your email was sent"
            })
       });
           var obj = JSON.parse(req.body);
           console.log(obj.message);
         


sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'contact.swoladm@gmail.com',
  from: obj.email,
  subject: 'SWOL Contact',
  text: obj.message,
//   html: '<strong></strong>',
};
sgMail.send(msg).then(()=>{
    console.log("sent");
    res.send("Your email was sent");
}).catch((error)=>{
    console.log('error', error);
});

})

