const Joi = require("@hapi/joi");


module.exports = {
  userValidation: Joi.object().keys({
    username: Joi.string().required().empty().messages({
      "string.base": `Username should be a type of 'text'`,
      "string.empty": `Username is required.`,
      "any.required": `Username is required.`,
    }),
    password: Joi.string().required().empty().min(6).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password is required.`,
      "string.min": `Password should be of minimum 6 characters.`,
      "any.required": `Password is required.`,
    }) ,
    fullname: Joi.string().required().empty().messages({
      "string.base": `Firstname should be a type of 'text'`,
      "string.empty": `Firstname is required.`,
      "any.required": `Firstname is required.`,
    }) ,
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": `Email is required.`,
      "string.email": `Email should be correct Format.`,
      "any.required": `Email is required.`,
    })  
  }),
  loginValidation: Joi.object().keys({
    username: Joi.string().required().empty().messages({
      "string.base": `Username should be a type of 'text'`,
      "string.empty": `Username is required.`,
      "any.required": `Username is required.`,
    }),
    password: Joi.string().required().empty().min(6).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password is required.`,
      "string.min": `Password should be of minimum 6 characters.`,
      "any.required": `Password is required.`,
    })
  }),
  
  };