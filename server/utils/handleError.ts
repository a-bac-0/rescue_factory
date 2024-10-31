import { Response } from 'express';

export const handleHttpError = (
    res: Response,
    message: string = "Acceso restringido 💀",
    code: number = 403
): void => {
    res.status(code).send({ error: message });
};
