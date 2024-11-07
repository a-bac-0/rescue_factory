import userModel, {UserAttributes} from "../models/usersModel";
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
        handleHttpError(res, "ERROR_LOGIN_USER");
        res.status(403).json({ error: error });
    }
};

// REGISTER
export const registerController = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role = "user" } = req.body;
        const passwordHash = await encrypt(password);

        // Verificar si el correo ya está registrado
        const existingUserByEmail = await userModel.findOne({ where: { email } });
        if (existingUserByEmail) {
            return res.status(409).json({ message: "El email ya está registrado" });
        }

        // Crear el nuevo usuario
        const newUser = await userModel.create({
            name,
            email,
            password: passwordHash,
            role,
        });

        // Crear un objeto sin la propiedad 'password'
        const userWithoutPassword = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        };

        // Generar el token para el usuario registrado
        const sessionData = {
            token: await tokenSign(newUser),
            user: userWithoutPassword,
        };

        res.status(201).json({
            message: "Usuario creado exitosamente",
            sessionData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};

// (OPCIONAL) LOGOUT - REFRESH TOKEN
