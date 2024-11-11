import bcrypt from 'bcryptjs';

export const encrypt = async (passwordPlain: string): Promise<string> => {
    // Encripta la contraseña usando un hash
    const hash = await bcrypt.hash(passwordPlain, 10);
    return hash;
}

export const compare = async (passwordPlain: string, hashPassword: string): Promise<boolean> => {
    // Compara la contraseña ingresada con el hash almacenado en la base de datos
    return await bcrypt.compare(passwordPlain, hashPassword);
}
