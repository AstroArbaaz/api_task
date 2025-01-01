import express from "express";
import { handleCreateEvent,handleGetEventById, handleGetEvents, handleUpdateEvent, handleDeleteEvent } from "../controllers/event_controller";

const router = express.Router();

router.post("/events", handleCreateEvent);
router.get("/events", handleGetEvents);
router.get("/events/:id", handleGetEventById);
router.put("/events/:id", handleUpdateEvent);
router.delete("/events/:id", handleDeleteEvent);

export default router;
