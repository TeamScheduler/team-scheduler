/*jshint strict:false */
var crypto = require("crypto");
var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String },
    password: String,
    isAdmin: { type: Boolean, default: false },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    hours: [{type: mongoose.Schema.Types.ObjectId, ref: "Hour"}],
    passwordResetToken: String,
    passwordResetExpires: Date
  },
  schemaOptions
);

userSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.virtual("gravatar").get(function() {
  if (!this.get("email")) {
    return "https://gravatar.com/avatar/?s=200&d=retro";
  }
  var md5 = crypto.createHash("md5").update(this.get("email")).digest("hex");
  return "https://gravatar.com/avatar/" + md5 + "?s=200&d=retro";
});

userSchema.options.toJSON = {
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.passwordResetToken;
    delete ret.passwordResetExpires;
  }
};

var User = mongoose.model("User", userSchema);

module.exports = User;
