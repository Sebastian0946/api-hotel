import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';

import { HabitacionRepository } from "../../repository/sistemaRepository/HabitacionRepository";
import createHttpError from "http-errors";

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
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear la habitación:', error.message);
                throw createHttpError(500, 'No se pudo crear la habitación. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
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
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al listar las habitaciónes:', error.message);
                throw createHttpError(500, 'No se pudo listar las habitaciónes. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
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
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener la habitación:', error.message);
                throw createHttpError(500, 'No se pudo obtener la habitación. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
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
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar la habitación:', error.message);
                throw createHttpError(500, 'No se pudo actualizar la habitación. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
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
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar la habitación:', error.message);
                throw createHttpError(500, 'No se pudo eliminar la habitación. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }
}