import userModel from "../models/usersModel";
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
            user: user,
        };

        // Solo enviamos la respuesta una vez.
        res.send({ sessionData }); // Respuesta final sin continuar la ejecución.
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

        const existingUserByEmail = await userModel.findOne({ where: { email } });
        if (existingUserByEmail) {
            res.status(409).json({ message: "El email ya está registrado" });
        }

        const newUser = await userModel.create({
            name,
            email,
            password: passwordHash,
            role,
        });

        // Generar el token para el usuario registrado
        const sessionData = {
            token: await tokenSign(newUser), // Generar token para el nuevo usuario
            user: newUser,
        };

        // Solo enviamos la respuesta una vez.
        res.status(201).json({
            message: "Usuario creado exitosamente",
            user: newUser,
            sessionData: sessionData,
        });
    } catch (error) {
        console.error(error);
        // En caso de error, enviamos el mensaje correspondiente.
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};

// (OPCIONAL) LOGOUT - REFRESH TOKEN
