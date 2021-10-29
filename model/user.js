const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minglength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  image: {
    type: String,
  },
});

userSchema.pre("save", function (next) {
  //비밀번호 암호화
  var user = this;

  //비밀번호가 수정될 때만 암호화
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = (
  plainPassword,
  encodedPassword,
  callback
) => {
  //plainPassword 와 암호화된 비밀번호랑 같은지 확인
  bcrypt.compare(plainPassword, encodedPassword, (err, isMatch) => {
    console.log(encodedPassword);
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = (user, callback) => {
  //jsonwebtoken을 사용해서 토큰생성
  console.log(user);
  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  user.save((err, user) => {
    if (err) return callback(err);
    callback(null, user);
  });
};
const User = mongoose.model("User", userSchema);

module.exports = { User };
