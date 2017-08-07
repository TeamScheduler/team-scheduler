/*jshint strict:false */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');

// Load environment variables from .env file
dotenv.load();

// Models
var User = require('./models/User');

// Controllers
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var teamController = require('./controllers/team');

var app = express();

 //function dropDB() {
 //    console.log("drop DB");
 //    mongoose.connection.db.dropDatabase();
 //}

mongoose.connect(process.env.MONGODB, function () {
    //dropDB();
});
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator({
  customValidators: {
    isHexColor: function(value) {
      return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value);
    }
  }
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});
/* CUIDADO A ORDEM AQUI IMPORTA!! */
app.post('/team', teamController.teamPost);
app.get('/team/members', authController.ensureAuthenticated, teamController.getTeamMembers);
app.get('/team/pending-members', authController.ensureAuthenticated, teamController.getTeamPendingMembers);
app.patch('/team/pending-members', authController.ensureAuthenticated, teamController.patchTeamPendingMembers);
app.post('/team/tag', authController.ensureAuthenticated, teamController.postTeamTag);
app.get('/team/tags', authController.ensureAuthenticated, teamController.getTeamTags);
app.patch('/team/tag', authController.ensureAuthenticated, teamController.patchTeamTagMembers);
app.get('/team/:id', teamController.getTeamById);
app.patch('/user/hours', authController.ensureAuthenticated, userController.editUserHours);
app.get('/user/hours', authController.ensureAuthenticated, userController.getUserHours);
app.put('/account', authController.ensureAuthenticated, userController.accountPut);
app.delete('/account', authController.ensureAuthenticated, userController.accountDelete);
app.post('/signup', userController.signupPost);
app.post('/login', authController.loginPost);
app.post('/forgot', userController.forgotPost);
app.post('/reset/:token', userController.resetPost);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'app', 'index.html'));
});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;