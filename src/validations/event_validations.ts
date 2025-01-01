// event-input.validation.ts
import Joi from "joi";

export const createEventValidation = Joi.object({
  name: Joi.string().required().min(3).max(255),
  date: Joi.date().required(),
  totalSeats: Joi.number().integer().required().min(1),
});

export const updateEventValidation = Joi.object({
  name: Joi.string().optional().min(3).max(255),
  date: Joi.date().optional(),
  totalSeats: Joi.number().integer().optional().min(1),
});
