// server/middleware/authorizeRole.ts

import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role; // Accede al rol del usuario desde `req.user`

    if (!userRole || !roles.includes(userRole)) {
      res.status(403).json({ message: 'Acceso denegado: permisos insuficientes' });
      return;
    }

    next(); // Pasa al siguiente middleware o controlador si el rol es permitido
  };
};
