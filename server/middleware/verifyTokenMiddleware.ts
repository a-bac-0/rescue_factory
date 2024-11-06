import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/handleJwt';
import { User } from '../types/user';

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del encabezado 'Bearer'

  if (!token) {
    res.status(401).json({ message: 'No se proporcionó el token' });
    return;
  }

  const decoded = await verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: 'Token inválido o expirado' });
    return;
  }

  req.user = decoded as User; // Agrega el usuario decodificado al objeto `req`
  next(); // Pasa al siguiente middleware o controlador
};
