import express from "express";

import bookingRouter from "./booking_routes";
import seatRouter from "./seat_routes";
import userRouter from "./user_routes";
import eventRouter from "./event_routes";

const router = express.Router();

router.use("/bookings", bookingRouter);
router.use("/seats", seatRouter);
router.use("/users", userRouter);
router.use("/events", eventRouter);

export default router;