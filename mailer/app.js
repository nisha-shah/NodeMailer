var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var mailer = require('nodemailer');

var app = express();

var smtpTransport = mailer.createTransport("SMTP",{
service: "Gmail",
auth: {
user: "nishashah461@gmail.com",
pass: "nishigundi"
}
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// app.get('/',function(req,res,next){
//   res.render('home');
// });

// app.get('/send',function(req,res,next){
//       var mailOptions={
//       to : req.query.to,
//       subject : req.query.subject,
//       text : req.query.text
//       }
//       console.log(mailOptions);
//       smtpTransport.sendMail(mailOptions, function(error, response){
//       if(error){
//       console.log(error);
//       //res.end("error");
//       res.json({"sucesss":"0"});
//       }else{
//       console.log("Message sent: " + response.message);
//      // res.end("sent");
//         res.json({"success":"1"});
//       }
//       });
// });


module.exports = app;
