// bookings.controller.ts
import { Request, Response } from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} from "../services/booking_services";

export const handleCreateBooking:any = async (req: Request, res: Response) => {
  try {
    const booking = await createBooking(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetBookings:any = async (req: Request, res: Response) => {
  try {
    const bookings = await getBookings();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetBookingById:any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const booking = await getBookingById(id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUpdateBooking:any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const booking = await updateBooking(id, req.body);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      res.status(200).json(booking);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDeleteBooking:any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await deleteBooking(id);
    res.status(204).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
