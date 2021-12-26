/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const joi = require("joi");
const errorHelper = require("../helper/errorHandle");

const validateUpdateProfile = (req, res, next) => {
  const { email, first_name, last_name, phone } = req.body;
  const schema = joi
    .object({
      email: joi.string().min(5).max(40).required(),
      first_name: joi.string().min(5).max(40).required(),
      last_name: joi.string().min(5).max(40).required(),
      phone: joi.string().min(5).max(20).required()
    })
    .options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((err) => err.message).toString();
    return next({ status: 422, message: errorMessage });
  }
  next();
};

module.exports = {
  validateUpdateProfile
};
