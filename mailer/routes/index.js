var express = require('express');
var router = express.Router();
var mailer = require('nodemailer');

var smtpTransport = mailer.createTransport("SMTP",{
service: "Gmail",
auth: {
user: "nishashah461@gmail.com",
pass: "nishigundi"
}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/send',function(req,res,next){
      var mailOptions={
        from: 'Nisha Shah <nishashah461@gmail.com>',
      to : 'Nisha Shah <'+req.query.to+'>',
      subject : req.query.subject,
      text : req.query.text
      }
     // console.log(mailOptions);

      smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
      	console.log("IN error function");
      console.log(error);
      //res.end("error");
      res.json({"sucesss":error});
      }else{
      console.log("Message sent: " + response.message);
     // res.end("sent");
        res.json({"success":"1"});
      }
      });
      smtpTransport.close();

});

module.exports = router;
