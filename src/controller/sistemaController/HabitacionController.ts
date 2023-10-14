import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';

import { HabitacionRepository } from "../../repository/sistemaRepository/HabitacionRepository";
import createHttpError from "http-errors";
import { ValidationError } from "class-validator";

@JsonController('/habitacion')
export class HabitacionController {

    constructor(private repository: HabitacionRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            console.log('Cuerpo de la solicitud:', body);

            if (!body.TipoHabitacionesId || !body.Codigo || !body.Descripcion) {
                throw createHttpError(400, 'Los campos TipoHabitacionesId, Codigo y Descripcion son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }
            
            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Habitación creada exitosamente',
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
                message: 'Habitaciónes listadas exitosamente',
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
                message: 'Habitación obtenida exitosamente',
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

            if (!body.TipoHabitacionesId || !body.Codigo || !body.Descripcion) {
                throw createHttpError(400, 'Los campos TipoHabitacionesId, Codigo y Descripcion son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Habitación actualizada exitosamente',
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
                message: 'Habitación eliminada exitosamente',
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