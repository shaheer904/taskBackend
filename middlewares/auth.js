const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/users/userModel");
const {
  ERRORS,
  STATUS_CODE,
  PERMISSIONS,
  STATUS,
} = require("../constants/index");

exports.authenticate = catchAsync(async (req, res, next) => {
  //getting token and check is it there

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.session.jwt) {
    token = req.session.jwt;
    console.log(token)

  }
  if (!token) {
    return next(
      new AppError(ERRORS.UNAUTHORIZED.NOT_LOGGED_IN, STATUS_CODE.UNAUTHORIZED)
    );
  }
  //verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //check if user sitll exists
  const currentUser = await User.findById(decoded.userdata.id)
  if (!currentUser) {
    return next(new AppError(`User Not Found`, STATUS_CODE.NOT_FOUND));
  }
  
  

  //Grant access to protected route
  req.user = currentUser;
  next();
});