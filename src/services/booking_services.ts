// bookings.service.ts
import { PrismaClient } from "@prisma/client";
import {
  createBookingValidation,
  updateBookingValidation,
} from "../validations/bookings_validations";

const prisma = new PrismaClient();

export const createBooking = async (data: any) => {
  try {
    const { error } = await createBookingValidation.validateAsync(data);
    if (error) {
      throw error;
    }
    // const booking = await prisma.booking.create({
    //   data: {
    //     eventId: data.eventId,
    //     userId: data.userId,
    //     seatId: data.seatId,
    //   },
    // });
    const { seatId, eventId, userId } = data;
    let booking;
    await prisma.$transaction(async (prisma) => {
      const seat = await prisma.seat.findUnique({
        where: { id: seatId },
      });

      if (!seat || seat.status !== "available") {
        throw new Error("Seat is not available");
      }

      await prisma.seat.update({
        where: { id: seatId },
        data: { status: "booked" },
      });

      booking = await prisma.booking.create({
        data: {
          eventId,
          userId,
          seatId,
        },
      });
    });
    return booking;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Seat is already booked");
    }
    throw error;
  }
};

export const getBookings = async () => {
  try {
    const bookings = await prisma.booking.findMany();
    return bookings;
  } catch (error) {
    throw error;
  }
};

export const getBookingById = async (id: string) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
    });
    return booking;
  } catch (error) {
    throw error;
  }
};

export const updateBooking = async (id: string, data: any) => {
  try {
    const { error } = await updateBookingValidation.validateAsync(data);
    if (error) {
      throw error;
    }
    const booking = await prisma.booking.update({
      where: { id },
      data: {
        eventId: data.eventId,
        userId: data.userId,
        seatId: data.seatId,
      },
    });
    return booking;
  } catch (error) {
    throw error;
  }
};

export const deleteBooking = async (id: string) => {
  try {
    await prisma.booking.delete({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};
