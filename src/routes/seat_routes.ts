// seats.routes.ts
import express from "express";
import {
  handleCreateSeat,
  handleGetSeats,
  handleGetSeatById,
  handleUpdateSeat,
  handleDeleteSeat,
} from "../controllers/seat_controller";

const router = express.Router();

router.post("/", handleCreateSeat);
router.get("/", handleGetSeats);
router.get("/:id", handleGetSeatById);
router.put("/:id", handleUpdateSeat);
router.delete("/:id", handleDeleteSeat);

export default router;
