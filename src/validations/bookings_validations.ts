// booking-input.validation.ts
import Joi from "joi";

export const createBookingValidation = Joi.object({
  eventId: Joi.string().required(),
  userId: Joi.string().required(),
  seatId: Joi.string().required(),
});

export const updateBookingValidation = Joi.object({
  eventId: Joi.string().optional(),
  userId: Joi.string().optional(),
  seatId: Joi.string().optional(),
  status: Joi.string().optional().valid("pending", "confirmed", "cancelled"),
});
