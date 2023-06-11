const mongoose = require("mongoose");
const crypto = require("crypto");
const { ERRORS } = require("../../constants/index");
const {
  encryptPassword,
  passwordChanged,
} = require("../../utils/mongoose-middlewares/middlewares");
const {
  correctPassword,

} = require("../../utils/methods/methods");

const userSchema = new mongoose.Schema(
  {
   
    firstName: {
      type: String,
     
      required: [true, ERRORS.REQUIRED.FIRSTNAME_REQUIRED],
    },
    lastName: {
      type: String,
     
      required: [true, ERRORS.REQUIRED.LASTNAME_REQUIRED],
    },
    
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, ERRORS.REQUIRED.EMAIL_REQUIRED],
    },
   
   
    password: {
      type: String,
      minlength: [8, ERRORS.INVALID.PASSWORD_LENGTH],
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


//pre save middleware (runs before data saved to db)
userSchema.pre("save", encryptPassword);
userSchema.pre("save", passwordChanged);
//SCHEMA METHODS
userSchema.methods.correctPassword = correctPassword;



const User = mongoose.model("user", userSchema);
module.exports = User;
