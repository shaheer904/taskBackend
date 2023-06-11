const { ERRORS} = require("../constants/index");
const Joi = require("joi");



exports.createUser = Joi.object().keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required()

});

exports.userLogin = Joi.object().keys({
    email: Joi.string().email().required(),
  password: Joi.string().required(),


});


exports.createCar = Joi.object().keys({
  color: Joi.string().required(),
  model: Joi.string().required(),
  make: Joi.string().required(),
  category: Joi.string().required(),
});
  
 
