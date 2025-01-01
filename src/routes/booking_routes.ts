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

router.post("/bookings", handleCreateBooking);
router.get("/bookings", handleGetBookings);
router.get("/bookings/:id", handleGetBookingById);
router.put("/bookings/:id", handleUpdateBooking);
router.delete("/bookings/:id", handleDeleteBooking);

export default router;
