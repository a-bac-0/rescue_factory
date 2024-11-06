import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/handleJwt';


// Middleware para verificar el rol de usuario
export const authorizeRole = (role: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1]; // Está extrayendo el token de autenticación desde el encabezado HTTP "Bearer TOKEN"

        if (!token) {
            return res.status(403).json({ message: 'No se proporciono el token💥' });
        }

        const decoded = await verifyToken(token);

        if (!decoded || typeof decoded !== 'object' || decoded.role !== role) {
            return res.status(403).json({ message: 'Acceso denegado: permisos insuficientes' });
        }

        next(); // Continúa a la siguiente función si el rol es correcto
    };
};
