import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/handleJwt';
import { User } from '../types/user';

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrae el token del encabezado 'Bearer'

  if (!token) {
    res.status(401).json({ message: 'Token not provided' });
    return;
  }

  try {
    const decoded = await verifyToken(token);

    if (!decoded) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    // Definir el tipo de `decoded` explícitamente como `User`
    req.user = decoded as User;
    req.body.user_id= decoded.id
    
    next();
  } catch (error) {
    console.error('Error verifying the token:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
