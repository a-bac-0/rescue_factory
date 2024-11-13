import userModel, { UserAttributes } from "../models/usersModel";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { handleHttpError } from "../utils/handleError";
import { encrypt, compare } from "../utils/handlePassword";
import { tokenSign } from "../utils/handleJwt";

dotenv.config();

// LOGIN
export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Incorrect credentials' });
      return;
    }

    const isMatch = await compare(password, user.password); // Usamos la función compare
    if (!isMatch) {
      res.status(400).json({ message: 'Incorrect credentials' });
      return;
    }

    const token = tokenSign(user); // Generate the JWT token

    // Create an object without the 'password' property for the response
    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.json({ message: 'Login successful', token, user: userWithoutPassword });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    } else {
      res.status(500).json({ message: 'Server error', error });
    }
  }
};

// REGISTER
export const registerController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    const passwordHash = await encrypt(password);

    // Check if the email is already registered
    const existingUserByEmail = await userModel.findOne({ where: { email } });
    if (existingUserByEmail) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    // Create the new user
    const newUser = await userModel.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    // Create an object without the 'password' property
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    // Generate the token for the newly registered user
    const token = await tokenSign(newUser);

    // Change the structure of the response for the test
    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword, // Now `user` is directly at the top level
      token, // Include the token at the top level as well
    });
  } catch (error) {
    console.error(error);
    // In case of error, send the appropriate message.
    res.status(500).json({ message: "Error registering the user" });
  }
};

// (OPTIONAL) LOGOUT - REFRESH TOKEN
