// server/types/express.d.ts

import { User } from './user'; // Importa el tipo User desde 'user.ts'

declare global {
  namespace Express {
    interface Request {
      user?: User;  // Añade el campo 'user' al Request de Express
    }
  }
}

export {};
