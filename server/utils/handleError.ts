import { Response } from 'express';

export const handleHttpError = (
    res: Response,
    message: string = "Restricted access 💀",
    code: number = 403
): void => {
    res.status(code).send({ error: message });
};
