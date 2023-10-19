import { Request, Response, NextFunction } from "express"
import { TipoHabitacionRepository } from "../../repository/parametrizacionRepository/TipoHabitacionRepostiroty";
import createHttpError from "http-errors";
import { Delete, Get, Post, Put } from "routing-controllers";
import { ValidationError } from "class-validator";

export class TipoHabitacionesController {

    constructor(private repository: TipoHabitacionRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {

        try {
            const body = req.body;

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Tipo habitación creado exitosamente',
                data: result
            });
        } catch (error: unknown) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    message: 'Error de validación',
                    details: error.toString(),
                });
            } else {

                const internalError = error as Error;

                res.status(500).json({
                    message: 'Ocurrió un error inesperado',
                    details: internalError.toString(),
                });
            }
        }
    }


    @Get()
    async list(req: Request, res: Response, next: NextFunction) {

        try {
            const result = await this.repository.list();

            res.status(200).json({
                message: 'Tipo habitaciónes creadas exitosamente',
                data: result
            });
        } catch (error: unknown) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    message: 'Error de validación',
                    details: error.toString(),
                });
            } else {

                const internalError = error as Error;

                res.status(500).json({
                    message: 'Ocurrió un error inesperado',
                    details: internalError.toString(),
                });
            }
        }

    }


    @Get('/:id')
    async get(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;

            const result = await this.repository.get(id)

            res.status(200).json({
                message: 'Tipo habitación encontrada exitosamente',
                data: result
            });
        } catch (error: unknown) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    message: 'Error de validación',
                    details: error.toString(),
                });
            } else {

                const internalError = error as Error;

                res.status(500).json({
                    message: 'Ocurrió un error inesperado',
                    details: internalError.toString(),
                });
            }
        }
    }

    @Put('/:id')
    async update(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;
            
            const body = req.body;

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Tipo habitación actualizada exitosamente',
                data: result
            });
        } catch (error: unknown) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    message: 'Error de validación',
                    details: error.toString(),
                });
            } else {

                const internalError = error as Error;

                res.status(500).json({
                    message: 'Ocurrió un error inesperado',
                    details: internalError.toString(),
                });
            }
        }
    }


    @Delete('/:id')
    async remove(req: Request, res: Response, next: NextFunction) {

        try {
            const { id } = req.params;

            const result = await this.repository.remove(id);

            res.status(200).json({
                message: 'Tipo habitación eliminada exitosamente',
                data: result
            });
        } catch (error: unknown) {
            if (error instanceof ValidationError) {
                res.status(400).json({
                    message: 'Error de validación',
                    details: error.toString(),
                });
            } else {

                const internalError = error as Error;

                res.status(500).json({
                    message: 'Ocurrió un error inesperado',
                    details: internalError.toString(),
                });
            }
        }
    }
}