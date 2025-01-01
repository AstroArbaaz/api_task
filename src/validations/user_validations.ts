// user-input.validation.ts
import Joi from "joi";

export const userInputValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  name: Joi.string().optional(),
});

export const loginInputValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

export const updateUserInputValidation = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().optional().min(8),
  name: Joi.string().optional(),
});
