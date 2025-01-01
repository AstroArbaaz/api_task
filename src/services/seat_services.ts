// seats.service.ts
import { PrismaClient } from "@prisma/client";
import memjs from "memjs"; // Memcached client
import {
  createSeatValidation,
  updateSeatValidation,
} from "../validations/seat_validations";

const prisma = new PrismaClient();
const memcachedClient = memjs.Client.create(); // Initialize Memcached client

// export const createSeat = async (data: any) => {
//   try {
//     const { error } = await createSeatValidation.validateAsync(data);
//     if (error) {
//       throw error;
//     }
//     const seat = await prisma.seat.create({
//       data: {
//         eventId: data.eventId,
//         label: data.label,
//       },
//     });
//     return seat;
//   } catch (error) {
//     throw error;
//   }
// };

export const createSeat = async (data: any) => {
  try {
    const { error } = await createSeatValidation.validateAsync(data);
    if (error) {
      throw error;
    }
    const seat = await prisma.seat.create({
      data: {
        eventId: data.eventId,
        label: data.label,
      },
    });

    // Update cache for all seats
    const seats = await prisma.seat.findMany(); // Fetch updated list
    await memcachedClient.set("all_seats", JSON.stringify(seats));

    return seat;
  } catch (error) {
    throw error;
  }
};

// export const getSeats = async () => {
//   try {
//     const seats = await prisma.seat.findMany();
//     return seats;
//   } catch (error) {
//     throw error;
//   }
// };

export const getSeats = async () => {
  try {
    // Check cache first
    const cachedSeats = await memcachedClient.get("all_seats");
    if (cachedSeats.value) {
      return JSON.parse(cachedSeats.value.toString());
    }

    // Fetch from database
    const seats = await prisma.seat.findMany();

    // Update cache
    await memcachedClient.set("all_seats", JSON.stringify(seats));

    return seats;
  } catch (error) {
    throw error;
  }
};

// export const getSeatById = async (id: string) => {
//   try {
//     const seat = await prisma.seat.findUnique({
//       where: { id },
//     });
//     return seat;
//   } catch (error) {
//     throw error;
//   }
// };

export const getSeatById = async (id: string) => {
  try {
    // Check cache first
    const cachedSeat = await memcachedClient.get(`seat_${id}`);
    if (cachedSeat.value) {
      return JSON.parse(cachedSeat.value.toString());
    }

    // Fetch from database
    const seat = await prisma.seat.findUnique({
      where: { id },
    });

    // Cache the result
    if (seat) {
      await memcachedClient.set(`seat_${id}`, JSON.stringify(seat));
    }

    return seat;
  } catch (error) {
    throw error;
  }
};

// export const updateSeat = async (id: string, data: any) => {
//   try {
//     const { error } = await updateSeatValidation.validateAsync(data);
//     if (error) {
//       throw error;
//     }
//     const seat = await prisma.seat.update({
//       where: { id },
//       data: {
//         eventId: data.eventId,
//         label: data.label,
//       },
//     });
//     return seat;
//   } catch (error) {
//     throw error;
//   }
// };

export const updateSeat = async (id: string, data: any) => {
  try {
    const { error } = await updateSeatValidation.validateAsync(data);
    if (error) {
      throw error;
    }
    const seat = await prisma.seat.update({
      where: { id },
      data: {
        eventId: data.eventId,
        label: data.label,
      },
    });

    // Update cache for the specific seat
    await memcachedClient.set(`seat_${id}`, JSON.stringify(seat));

    // Update cache for all seats
    const seats = await prisma.seat.findMany(); // Fetch updated list
    await memcachedClient.set("all_seats", JSON.stringify(seats));

    return seat;
  } catch (error) {
    throw error;
  }
};

// export const deleteSeat = async (id: string) => {
//   try {
//     await prisma.seat.delete({
//       where: { id },
//     });
//   } catch (error) {
//     throw error;
//   }
// };

export const deleteSeat = async (id: string) => {
  try {
    await prisma.seat.delete({
      where: { id },
    });

    // Invalidate cache for the specific seat
    await memcachedClient.delete(`seat_${id}`);

    // Update cache for all seats
    const seats = await prisma.seat.findMany(); // Fetch updated list
    await memcachedClient.set("all_seats", JSON.stringify(seats));
  } catch (error) {
    throw error;
  }
};
