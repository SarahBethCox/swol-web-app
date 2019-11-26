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
        //  res.status(200).json({
           
        //         message: "inside funtion"
        //     })
      var obj = JSON.parse(req.body);
      sgMail.setApiKey('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');
      
      const msg = {
                    to: 'contact.swoladm@gmail.com',
                    from: obj.email,
                    subject: 'SWOL Contact',
                    text: obj.message,
                  //   html: '<strong></strong>',
        };


        sgMail.send(msg).then(()=>{
            console.log("sent");
             res.status(200).json({
           
                message: "Senttttt"
            })
            // res.send("Email sent");
          }).catch((error)=>{
              console.log('error', error);
          });
      });
            
          //  console.log(obj.message);
         


})

