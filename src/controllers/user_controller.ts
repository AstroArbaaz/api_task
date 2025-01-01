import { Request, Response } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, findUserByEmail } from "../services/user_services";
import { userInputValidation, loginInputValidation, updateUserInputValidation } from '../validations/user_validations';
import { HashInfo, CompareHash } from '../utils/hasher';
import { generateToken } from '../utils/token_generator';

export const handleCreateUser:any = async (req: Request, res: Response) => {
  try {
    const{error, value} = userInputValidation.validate(req.body);
    if(error){
      return res.status(400).json({message: "Invalid Input", error: error.details[0].message});
    }

    const hashedPassword = await HashInfo(value.password);

    value.password = hashedPassword;

    const user = await createUser(value);

    res.status(201).json(user);
  } catch (error:any) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetAllUsers:any = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleGetUserById:any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleUpdateUser:any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    // const { valid, errors } = await validateInput(req.body);
    // if (!valid) {
    //   return res.status(400).json({ message: "Invalid input", errors });
    // }

    const { error, value } = updateUserInputValidation.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid Input", error: error.details[0].message });
    }

    const user = await updateUser(id, value);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error:any) {
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleDeleteUser:any = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    await deleteUser(id);
    res.status(204).json({ message: "User deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogin:any = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginInputValidation.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid Input", error: error.details[0].message });
    }

    const user = await findUserByEmail(value.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await CompareHash(value.password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ userId: user.id, email: user.email });

    res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
