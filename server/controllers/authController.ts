import userModel, {UserAttributes} from "../models/usersModel";
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
        res.status(400).json({ message: 'Credenciales incorrectas' });
        return;
      }
  
      const isMatch = await compare(password, user.password); // Usamos la función compare
      if (!isMatch) {
        res.status(400).json({ message: 'Credenciales incorrectas' });
        return;
      }
  
      const token = tokenSign(user); // Generamos el token JWT
      res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: 'Error en el servidor', error: error.message });
      } else {
        res.status(500).json({ message: 'Error en el servidor', error });
      }
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
            res.status(409).json({ message: "El email ya está registrado" });
            return;
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
         const token = await tokenSign(newUser);

         // Cambiar la estructura de la respuesta para el test
         res.status(201).json({
             message: "Usuario creado exitosamente",
             user: userWithoutPassword, // Ahora `user` está directamente en el nivel superior
             token, // Incluir el token en el nivel superior también
         });
    } catch (error) {
        console.error(error);
        // En caso de error, enviamos el mensaje correspondiente.
        res.status(500).json({ message: "Error al registrar el usuario" });
    }
};

// (OPCIONAL) LOGOUT - REFRESH TOKEN

