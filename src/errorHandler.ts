import { Request, Response, NextFunction } from 'express';
import { NotFound } from "http-errors";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    
    console.error(err); // Imprime el error en la consola para propósitos de depuración

    // Comprueba si el error es una instancia de tu clase NotFound personalizada
    if (err instanceof NotFound) {
        return res.status(404).json({ error: err.message });
    }

    // Si el error no es reconocido, devuelve un error de servidor interno
    return res.status(500).json({ error: 'Internal Server Error' });
}