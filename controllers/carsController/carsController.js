const Car =require('../../models/cars/carsModel')
const Category =require('../../models/category/categoryModel')

const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/AppError");
const {
    ERRORS,
    STATUS_CODE,
    SUCCESS_MSG,
    STATUS,
    ROLES,
  } = require("../../constants/index");
const {createCar}= require('../../utils/validation')

  exports.createOne = catchAsync(async (req, res, next) => {
    try {
      await createCar.validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: true,
      });
       const category= await Category.findOne({_id:req.body.category})
        if (!category) {
            return next(
              new AppError(
                "Category not found",
                STATUS_CODE.BAD_REQUEST
              )
            );
          }
      const result = await Car.create(req.body);
      res.status(STATUS_CODE.CREATED).json({
        status: STATUS.SUCCESS,
        message: SUCCESS_MSG.SUCCESS_MESSAGES.CREATED,
        result,
      });
    } catch (err) {
      res.status(STATUS_CODE.SERVER_ERROR).json({
        status: STATUS.ERROR,
        message: err.message,
      });
    }
  });
  
  exports.updateOne = catchAsync(async (req, res, next) => {
    try {
      await createCar.validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: true,
      });
        const category= await Category.findOne({_id:req.body.category})
        if (!category) {
            return next(
              new AppError(
                "Category not found",
                STATUS_CODE.BAD_REQUEST
              )
            );
          }
      const car = await Car.findById(req.params.id);
      if (!car) {
        return next(
          new AppError(
            "Car not found",
            STATUS_CODE.BAD_REQUEST
          )
        );
      }
      const result = await Car.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.status(STATUS_CODE.OK).json({
        status: STATUS.SUCCESS,
        message: SUCCESS_MSG.SUCCESS_MESSAGES.UPDATE,
        result,
      });
    } catch (err) {
      res.status(STATUS_CODE.SERVER_ERROR).json({
        status: STATUS.ERROR,
        message: err.message,
      });
    }
  });
  
  exports.getAll = catchAsync(async (req, res, next) => {
    try {
      
        result = await 
          Car.find({})
      
  
      res.status(STATUS_CODE.OK).json({
        status: STATUS.SUCCESS,
        message: SUCCESS_MSG.SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
        result,
      });
    } catch (err) {
      res.status(STATUS_CODE.SERVER_ERROR).json({
        status: STATUS.ERROR,
        message: err.message,
      });
    }
  });

  exports.getOne = catchAsync(async (req, res, next) => {
    try {
      const result = await Car.findById(req.params.id)
      if (!result) {
        return next(
          new AppError(ERRORS.INVALID.NOT_FOUND, STATUS_CODE.NOT_FOUND)
        );
      }
      res.status(STATUS_CODE.OK).json({
        status: STATUS.SUCCESS,
        message: SUCCESS_MSG.SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
        result,
      });
    } catch (err) {
      res.status(STATUS_CODE.SERVER_ERROR).json({
        status: STATUS.ERROR,
        message: err.message,
      });
    }
  });
  
  exports.deleteOne = catchAsync(async (req, res, next) => {
    try {
      const result = await Car.findByIdAndDelete(req.params.id);
      if (!result) {
        return next(
          new AppError(ERRORS.INVALID.NOT_FOUND, STATUS_CODE.NOT_FOUND)
        );
      }
      res.status(STATUS_CODE.OK).json({
        status: STATUS.SUCCESS,
        message: SUCCESS_MSG.SUCCESS_MESSAGES.DELETE,
        result: null,
      });
    } catch (err) {
      res.status(STATUS_CODE.SERVER_ERROR).json({
        status: STATUS.ERROR,
        message: err.message,
      });
    }
  });