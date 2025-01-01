import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

const prisma = new PrismaClient();

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

// Create a new user
export async function createUser(data:{
  email: string;
  password: string;
  name?: string;
}) {
  try {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// Get all users
export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw error;
  }
}

// Get a user by ID
export async function getUserById(id:string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// Update a user
export async function updateUser(id:string, data:{
  email?: string;
  password?: string;
  name?: string;
}) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// Delete a user
export async function deleteUser(id:string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
}
