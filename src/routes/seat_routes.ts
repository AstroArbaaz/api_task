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

router.post("/seats", handleCreateSeat);
router.get("/seats", handleGetSeats);
router.get("/seats/:id", handleGetSeatById);
router.put("/seats/:id", handleUpdateSeat);
router.delete("/seats/:id", handleDeleteSeat);

export default router;
