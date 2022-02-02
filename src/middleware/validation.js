/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const joi = require("joi");
const errorHelper = require("../helper/errorHandle");

const validatePhoneNumber = (req, res, next) => {
  // const { email, first_name, last_name, phone } = req.body;
  const schema = joi
    .object({
      phone: joi.string().min(5).max(20).required().regex(/[0-9]/)
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
  validatePhoneNumber
};

// const validatePhoneNumber = (req, res, next) => {
//   // const { email, first_name, last_name, phone } = req.body;
//   const schema = joi
//     .object({
//       email: joi.string().min(5).max(40).required(),
//       first_name: joi.string().min(3).max(40).required(),
//       last_name: joi.string().min(3).max(40).required(),
//       phone: joi.string().min(5).max(20).required().regex(/[0-9]/)
//     })
//     .options({ abortEarly: false });
//   const { error } = schema.validate(req.body);
//   if (error) {
//     const errorMessage = error.details.map((err) => err.message).toString();
//     return next({ status: 422, message: errorMessage });
//   }
//   next();
// };
