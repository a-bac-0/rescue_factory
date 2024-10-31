//en el .env agregar "JWT_SECRET ='contraseña' " y exportarlo en el config.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JWT } from '../config';

dotenv.config();

interface User {
    id: number;
    [key: string]: any;
}

export const tokenSign = async (user: User): Promise<string> => {
    // Firmar el token con el id del usuario
    const sign = jwt.sign(
        {
            id: user.id
        },
        JWT as jwt.Secret, // Especifica que JWT es un secreto
        {
            expiresIn: '24h'
        }
    );
    return sign;
};

export const verifyToken = async (token: string): Promise<string | jwt.JwtPayload | null> => {
    try {
        return jwt.verify(token, JWT as jwt.Secret); // Verificar el token con JWT
    } catch (error) {
        return null;
    }
};
