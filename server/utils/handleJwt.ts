import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JWT } from '../config';

dotenv.config();

interface User {
  id: number;
  role: string;
  [key: string]: any; // Permite agregar más campos al tipo User si es necesario
}

export const tokenSign = async (user: User): Promise<string> => {
  const sign = jwt.sign(
    {
      id: user.id,
      role: user.role, // Agregar el rol al payload para poder verificar el rol
    },
    JWT as jwt.Secret,
    {
      expiresIn: '24h', // Expiración del token
    }
  );
  return sign;
};


export const verifyToken = async (token: string): Promise<User | null> => {
  try {
    const decoded = jwt.verify(token, JWT as jwt.Secret); // Verificar el token

    // Hacemos un "casting" a User, porque sabemos que el payload tiene las propiedades `id` y `role`
    // Verificamos que el `decoded` tenga las propiedades esperadas
    if (typeof decoded === 'object' && 'id' in decoded && 'role' in decoded) {
      return decoded as User; // Retornamos el usuario decodificado
    } else {
      console.error('Token decodificado no tiene la estructura esperada');
      return null;  // Si no tiene la estructura esperada, devolver null
    }
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return null;  // Si ocurre algún error, retornar null
  }
};
