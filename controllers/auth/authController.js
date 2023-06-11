const AppError = require('../../utils/AppError');
const catchAsync = require('../../utils/catchAsync');
const User = require('../../models/users/userModel');
const {
  ERRORS,
  STATUS_CODE,
  SUCCESS_MSG,
  STATUS,
} = require('../../constants/index');
const jwtManagement = require('../../utils/jwtManagement');
const { random } = require('../../utils/methods/methods');
const { sendEmail } = require('../../utils/emails/email');
const { createUser, userLogin } = require('../../utils/validation');

exports.signup = catchAsync(async (req, res, next) => {
  try {
    await createUser.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });
    let result;

    const isEmail = await User.findOne({ email: req.body.email });
    if (isEmail) {
      return next(
        new AppError(
          'Email Already Exists with this email',
          STATUS_CODE.BAD_REQUEST
        )
      );
    }

    const pass = random(10);
    req.body.password = pass;
    console.log(pass);
    await sendEmail(req.body.email, pass);

    const session = await User.startSession();
    await session.withTransaction(async () => {
      result = await User.create([req.body], { session: session });
    });

    session.endSession();

    res.status(STATUS_CODE.OK).json({
      status: STATUS.SUCCESS,
      message: SUCCESS_MSG.SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
    });
  } catch (err) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      status: STATUS.ERROR,
      message: err.message,
    });
  }
});

exports.login = catchAsync(async (req, res, next) => {
  try {
    await userLogin.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    const { email, password } = req.body;
    if (!email || !password) {
      // checking email or password empty?
      return next(
        new AppError(
          ERRORS.INVALID.NO_CREDENTIALS_EMAIL,
          STATUS_CODE.BAD_REQUEST
        )
      );
    }
    // Finding user by username, phone or email
    const user = await User.findOne({ email: email }).select('+password');
    //
    if (!user || !(await user.correctPassword(password, user.password))) {
      //user existance and password is correct
      return next(
        new AppError(
          ERRORS.INVALID.INVALID_LOGIN_CREDENTIALS,
          STATUS_CODE.BAD_REQUEST
        )
      );
    }
    console.log(user);

    jwtManagement.createSendJwtToken(user, STATUS_CODE.OK, 'user', req, res);
  } catch (err) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      status: STATUS.ERROR,
      message: err.message,
    });
  }
});

exports.currentUser = catchAsync(async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.user._id);

    // const data={currentUser,currency};

    res.status(STATUS_CODE.OK).json({
      status: STATUS.SUCCESS,
      message: SUCCESS_MSG.SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
      result: currentUser,
    });
  } catch (err) {
    res.status(STATUS_CODE.SERVER_ERROR).json({
      status: STATUS.ERROR,
      message: err.message,
    });
  }
});
