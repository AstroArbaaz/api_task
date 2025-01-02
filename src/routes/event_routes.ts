import express from "express";
import { handleCreateEvent,handleGetEventById, handleGetEvents, handleUpdateEvent, handleDeleteEvent, handleGetSeatAvailability, handleBookSeats } from "../controllers/event_controller";

const router = express.Router();

router.post("/", handleCreateEvent);
router.get("/", handleGetEvents);
router.get("/:id", handleGetEventById);
router.put("/:id", handleUpdateEvent);
router.delete("/:id", handleDeleteEvent);
router.get("/:eventId/seats", handleGetSeatAvailability);
router.post("/:eventId/book", handleBookSeats);

export default router;
