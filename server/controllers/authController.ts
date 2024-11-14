import userModel, { UserAttributes } from "../models/usersModel";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { handleHttpError } from "../utils/handleError";
import { encrypt, compare } from "../utils/handlePassword";
import { tokenSign } from "../utils/handleJwt";

dotenv.config();

// LOGIN
export const loginController = async (req: Request, res: Response) => {
  try {
      const userEmail = req.body.email;
      const loginPassword = req.body.password;

      const user = await userModel.findOne({ where: { email: userEmail } });
      if (!user) {
          handleHttpError(res, "USER_NOT_EXISTS", 404);
          return;
      }

      const passwordHashed = user.password;
      const checkPasswords = await compare(loginPassword, passwordHashed);


      if (!checkPasswords) {
          handleHttpError(res, "PASSWORD_INVALID", 401);
          return;
      }

      const sessionData = {
          token: await tokenSign(user),
          user: user
      };

      res.send({ sessionData });
  } catch (error) {
      console.log(error);
      handleHttpError(res, "ERROR_LOGIN_USER"); // En caso de error, envía la respuesta.
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
