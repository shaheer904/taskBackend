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


  exports.createOne = catchAsync(async (req, res, next) => {
    try {
        const {title}=req.body
        if (!title) {
            return next(
              new AppError(
                "Category title is required",
                STATUS_CODE.BAD_REQUEST
              )
            );
          }
         
      const result = await Category.create(req.body);
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
        const {title}=req.body
        if (!title) {
            return next(
              new AppError(
                "Category title is required",
                STATUS_CODE.BAD_REQUEST
              )
            );
          }
      const category = await Category.findById(req.params.id);
      if (!category) {
        return next(
          new AppError(
            "Category not found",
            STATUS_CODE.BAD_REQUEST
          )
        );
      }
      const result = await Category.findByIdAndUpdate(req.params.id, req.body, {
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
          Category.find({})
      
  
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
      const result = await Category.findById(req.params.id)
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
      const result = await Category.findByIdAndDelete(req.params.id);
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