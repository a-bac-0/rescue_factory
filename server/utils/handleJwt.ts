//en el .env agregar "JWT_SECRET ='contraseña' " y exportarlo en el config.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JWT } from '../config';

dotenv.config();

interface User {
    id: number;
    role: string; 
    [key: string]: any;
}

export const tokenSign = async (user: User): Promise<string> => {
    // Firmar el token con el id y el rol del usuario
    const sign = jwt.sign(
        {
            id: user.id,
            role: user.role // Agregar el rol al payload para poder verificar el rol
        },
        JWT as jwt.Secret,
        {
            expiresIn: '24h'
        }
    );
    return sign;
};

export const verifyToken = async (token: string): Promise<string | jwt.JwtPayload | null> => {
    try {
        const decoded = jwt.verify(token, JWT as jwt.Secret); // Verificar el token

        // Aquí verificamos el rol
        if (typeof decoded === 'object' && decoded.role === 'admin') {
            console.log('El usuario es administrador');
        }

        return decoded;
    } catch (error) {
        return null;
    }
};