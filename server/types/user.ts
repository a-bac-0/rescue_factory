// server/src/types/user.ts

export interface User {
    id: number;
    role: string;
    [key: string]: any; // Si deseas agregar más campos al usuario, puedes hacerlo aquí
  }
  