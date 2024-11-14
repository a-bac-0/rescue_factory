import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/handleJwt';
import { handleHttpError } from '../utils/handleError';
import UserModel from '../models/usersModel';
import { User } from '../types/user';

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Verifica si hay un token en las cabeceras
    if (!req.headers.authorization) {
      handleHttpError(res, 'NEED_SESSION', 401);
      return;
    }

    // Extrae el token del encabezado 'Bearer'
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      handleHttpError(res, 'Token not provided', 401);
      return;
    }

    // Verifica el token usando la función verifyToken
    const decoded: any = await verifyToken(token);
    if (!decoded || !decoded.id) {
      handleHttpError(res, 'Invalid or expired token', 401);
      return;
    }

    // Busca el usuario en la base de datos usando el id decodificado
    const user = await UserModel.findByPk(decoded.id);
    if (!user) {
      handleHttpError(res, 'User not found', 404);
      return;
    }

    // Agrega el usuario a req.body para acceso en las rutas siguientes
    req.body.user = user;

    // Pasa al siguiente middleware
    next();
  } catch (error) {
    console.error('Error verifying the token:', error);
    handleHttpError(res, 'NOT_SESSION', 401);
  }
};
