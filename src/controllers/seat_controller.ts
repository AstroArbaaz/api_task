// seats.controller.ts
import { Request, Response } from "express";
import {
  createSeat,
  getSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
} from "../services/seat_services";

export const handleCreateSeat:any = async (req: Request, res: Response) => {
  try {
    const seat = await createSeat(req.body);
    res.status(201).json(seat);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetSeats:any = async (req: Request, res: Response) => {
  try {
    const seats = await getSeats();
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetSeatById:any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const seat = await getSeatById(id);
    if (!seat) {
      res.status(404).json({ message: "Seat not found" });
    } else {
      res.status(200).json(seat);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUpdateSeat:any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const seat = await updateSeat(id, req.body);
    if (!seat) {
      res.status(404).json({ message: "Seat not found" });
    } else {
      res.status(200).json(seat);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDeleteSeat:any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteSeat(id);
    res.status(204).json({ message: "Seat deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
