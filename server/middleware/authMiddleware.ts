// server/middleware/authorizeRole.ts

import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(403).json({ message: 'Access denied: User not authenticated' });
      return;
    }

    const userRole = req.user.role;

    if (!userRole || !roles.includes(userRole)) {
      res.status(403).json({ message: 'Access denied: insufficient permissions' });
      return;
    }

    next();
  };
};