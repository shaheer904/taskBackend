const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const User = require("../../models/users/userModel");

exports.correctPassword = async function (candidatePassword, userpassword) {
  // Check Password Is Correct??
  return await bcryptjs.compare(candidatePassword, userpassword);
};




exports.random = function (length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
