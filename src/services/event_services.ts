// events.service.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEvent = async (data: any) => {
  try {
    const event = await prisma.event.create({
      data: {
        name: data.name,
        date: data.date,
        totalSeats: data.totalSeats,
      },
    });
    return event;
  } catch (error) {
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const events = await prisma.event.findMany();
    return events;
  } catch (error) {
    throw error;
  }
};

export const getEventById = async (id: string) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    return event;
  } catch (error) {
    throw error;
  }
};

export const updateEvent = async (id: string, data: any) => {
  try {
    const event = await prisma.event.update({
      where: { id },
      data: {
        name: data.name,
        date: data.date,
        totalSeats: data.totalSeats,
      },
    });
    return event;
  } catch (error) {
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    await prisma.event.delete({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};

// export const bookEvent = async (eventId: string, userId: string) => {
//   try {
//     const event = await prisma.event.findUnique({
//       where: { id: eventId },
//     });

//     if (!event) {
//       throw new Error("Event not found");
//     }

//     const booking = await prisma.booking.create({
//       data: {
//         eventId,
//         userId,
//       },
//     });

//     return booking;
//   } catch (error) {
//     throw error;
//   }
// };

export const getSeatAvailability = async (eventId: string) => {
  const seats = await prisma.seat.findMany({
    where: { eventId },
    select: { id: true, status: true },
  });
  return seats;
};

export const bookSeats = async (eventId: string, seats: string[]) => {
  const bookingResult = await prisma.seat.updateMany({
    where: {
      eventId,
      id: { in: seats },
      status: "available",
    },
    data: { status: "booked" },
  });
  return bookingResult.count > 0;
};