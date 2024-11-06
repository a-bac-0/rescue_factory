import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/handleJwt';
import { User } from '../types/user'; // Importa el tipo User

// Middleware para verificar el rol de usuario
export const authorizeRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1]; // Extraer el token de la cabecera 'Bearer'

    if (!token) {
      // Si no hay token, enviamos respuesta de error
      res.status(403).json({ message: 'No se proporcionó el token' });
      return; // No es necesario usar `return`, pero lo dejamos para que no se ejecute el siguiente código
    }

    const decoded = await verifyToken(token);

    if (!decoded) {
      // Si el token es inválido o expirado, enviamos respuesta de error
      res.status(403).json({ message: 'Token inválido o expirado' });
      return; // Similarmente, detenemos la ejecución aquí
    }

    // Aquí TypeScript ya sabe que `decoded` es de tipo `User`, por lo que podemos acceder a `decoded.role`
    if (!roles.includes(decoded.role)) {
      // Si el rol no está permitido, enviamos respuesta de error
      res.status(403).json({ message: 'Acceso denegado: permisos insuficientes' });
      return; // Terminamos la ejecución de la solicitud aquí
    }

    // Si el rol es válido, agregamos al usuario al objeto `req`
    req.user = decoded;

    // Llamamos a `next()` para continuar con el flujo de ejecución de la solicitud
    next();
  };
};
