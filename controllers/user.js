/*jshint strict:false */
var async = require("async");
var crypto = require("crypto");
var nodemailer = require("nodemailer");
var request = require("request");
var mongoose = require("mongoose");
var authController = require("./auth");
var User = require("../models/User");
var Team = require("../models/Team");

var createUser = function(user, callback) {
  var newUser = new User(user);

  newUser.save(function(err) {
    if (!err) {
      callback(false, newUser);
    }
  });
};

exports.createUser = createUser;

/**
 * POST /signup
 */
exports.signupPost = function(req, res) {
  req.assert("name", "Name cannot be blank").notEmpty();
  req.assert("email", "Email is not valid").isEmail();
  req.assert("email", "Email cannot be blank").notEmpty();
  req.assert("password", "Password must be at least 6 characters long").len(6);
  req.assert("team", "TeamId cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.team)) {
    return res.status(400).send({ msg: "Team id is not valid." });
  }

  User.findOne(
    { email: req.body.email, team: mongoose.Types.ObjectId(req.body.team) },
    function(err, user) {
      if (user) {
        return res.status(400).send({
          msg:
            "The email address " +
            req.body.email +
            " is already associated with an account in this team "
        });
      }

      req.body.isAdmin = false;

      createUser(req.body, function(err, user) {
        if (err) {
          return res.status(400).send(err);
        }

        //FIXME: Validar emails bloqueados no time.
        Team.findOneAndUpdate(
          req.body.team,
          { $addToSet: { pending_members: user._id } },
          { safe: true, new: true },
          function(err, team) {
            if (!team) {
              User.remove({ _id: user._id }, function() {
                res.status(400).send({ error: "Team not fount" });
              });
            } else {
              res.send({
                token: authController.generateToken(user),
                user: user
              });
            }
          }
        );
      });
    }
  );
};

/**
 * PUT /account
 * Update profile information OR change password.
 */
exports.accountPut = function(req, res) {
  if ("password" in req.body) {
    req
      .assert("password", "Password must be at least 4 characters long")
      .len(4);
    req.assert("confirm", "Passwords must match").equals(req.body.password);
  } else {
    req.assert("email", "Email is not valid").isEmail();
    req.assert("email", "Email cannot be blank").notEmpty();
    req.sanitize("email").normalizeEmail({ remove_dots: false });
  }

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  User.findById(req.user.id, function(err, user) {
    if ("password" in req.body) {
      user.password = req.body.password;
    } else {
      user.email = req.body.email;
      user.name = req.body.name;
    }
    user.save(function(err) {
      if ("password" in req.body) {
        res.send({ msg: "Your password has been changed." });
      } else if (err && err.code === 11000) {
        res.status(409).send({
          msg:
            "The email address you have entered is already associated with another account."
        });
      } else {
        res.send({
          user: user,
          msg: "Your profile information has been updated."
        });
      }
    });
  });
};

/**
 * DELETE /account
 */
exports.accountDelete = function(req, res) {
  User.remove({ _id: req.user.id }, function(err) {
    if (!err) {
      res.send({ msg: "Your account has been permanently deleted." });
    }
  });
};

/**
 * POST /forgot
 */
exports.forgotPost = function(req, res, next) {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("email", "Email cannot be blank").notEmpty();
  req.sanitize("email").normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  async.waterfall([
    function(done) {
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString("hex");
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          return res.status(400).send({
            msg:
              "The email address " +
              req.body.email +
              " is not associated with any account."
          });
        }
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // expire in 1 hour
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var transporter = nodemailer.createTransport({
        service: "Mailgun",
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: "support@yourdomain.com",
        subject: "✔ Reset your password on Mega Boilerplate",
        text:
          "You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n" +
          "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
          "http://" +
          req.headers.host +
          "/reset/" +
          token +
          "\n\n" +
          "If you did not request this, please ignore this email and your password will remain unchanged.\n"
      };
      transporter.sendMail(mailOptions, function(err) {
        res.send({
          msg:
            "An email has been sent to " +
            user.email +
            " with further instructions."
        });
        done(err);
      });
    }
  ]);
};

/**
 * POST /reset
 */
exports.resetPost = function(req, res) {
  req.assert("password", "Password must be at least 4 characters long").len(4);
  req.assert("confirm", "Passwords must match").equals(req.body.password);

  console.log("muda senha");

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  async.waterfall([
    function(done) {
      User.findOne({ passwordResetToken: req.params.token })
        .where("passwordResetExpires")
        .gt(Date.now())
        .exec(function(err, user) {
          if (!user) {
            return res
              .status(400)
              .send({ msg: "Password reset token is invalid or has expired." });
          }
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save(function(err) {
            done(err, user);
          });
        });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport({
        service: "Mailgun",
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD
        }
      });
      var mailOptions = {
        from: "support@yourdomain.com",
        to: user.email,
        subject: "Your Mega Boilerplate password has been changed",
        text:
          "Hello,\n\n" +
          "This is a confirmation that the password for your account " +
          user.email +
          " has just been changed.\n"
      };
      transporter.sendMail(mailOptions, function(err) {
        res.send({ msg: "Your password has been changed successfully." });
      });
    }
  ]);
};
