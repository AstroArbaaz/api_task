// bookings.routes.ts
import express from "express";
import {
  handleCreateBooking,
  handleGetBookings,
  handleGetBookingById,
  handleUpdateBooking,
  handleDeleteBooking,
} from "../controllers/booking_controller";

const router = express.Router();

router.post("/", handleCreateBooking);
router.get("/", handleGetBookings);
router.get("/:id", handleGetBookingById);
router.put("/:id", handleUpdateBooking);
router.delete("/:id", handleDeleteBooking);

export default router;
