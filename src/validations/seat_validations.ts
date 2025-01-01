// seat-input.validation.ts
import Joi from "joi";

export const createSeatValidation = Joi.object({
  eventId: Joi.string().required(),
  label: Joi.string().required().min(1).max(255),
});

export const updateSeatValidation = Joi.object({
  eventId: Joi.string().optional(),
  label: Joi.string().optional().min(1).max(255),
  status: Joi.string().optional().valid("available", "booked", "cancelled"),
});
