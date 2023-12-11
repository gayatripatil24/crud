//For input validation
const Joi = require("joi");
// Define a validation schema for the request body
export const loginSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().min(3).max(100).required(),
  password: Joi.string().min(3).max(50).required(),
  role: Joi.string().min(3).max(50).required(),
});

export const createSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().min(3).max(100).required(),
  password: Joi.string().min(3).max(50).required(),
  role: Joi.string().min(3).max(50).required(),
});

export const updateSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email().min(3).max(100),
  password: Joi.string().min(3).max(50),
  role: Joi.string().min(3).max(50),
});
