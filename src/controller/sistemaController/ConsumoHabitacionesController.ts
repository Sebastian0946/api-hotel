import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete } from 'routing-controllers';

import { ConsumoHabitacionRepository } from "../../repository/sistemaRepository/ConsumoHabitacionRepository";
import createHttpError from "http-errors";

@JsonController('/consumoHabitacion')
export class ConsumoHabitacionesController {

    constructor(private repository: ConsumoHabitacionRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            if (!body.ProductoId || !body.ReservaHabitacionesId || !body.DescuentoId || !body.Codigo || !body.Cantidad) {
                throw createHttpError(400, 'Los campos ProductoId, ReservaHabitacionesId, DescuentoId, Codigo y Cantidad son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Consumo de la habitacion creado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear el Consumo de la habitacion:', error.message);
                throw createHttpError(500, 'No se pudo crear el Consumo de la habitacion. Por favor, intenta nuevamente más tarde.');
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
                message: 'Consumos de las habitaciones listadas exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al listar consumos de las habitaciones:', error.message);
                throw createHttpError(500, 'No se pudo listar consumos de las habitaciones. Por favor, intenta nuevamente más tarde.');
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
                message: 'Consumo de la habitacion encontrada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al encontrar consumo de la habitacion:', error.message);
                throw createHttpError(500, 'No se pudo encontrar consumo de la habitacion. Por favor, intenta nuevamente más tarde.');
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

            if (!body.ProductoId || !body.ReservaHabitacionesId || !body.DescuentoId || !body.Codigo || !body.Cantidad) {
                throw createHttpError(400, 'Los campos ProductoId, ReservaHabitacionesId, DescuentoId, Codigo y Cantidad son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Consumo de la habitacion actualizada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar consumo de la habitacion:', error.message);
                throw createHttpError(500, 'No se pudo actualizar consumo de la habitacion. Por favor, intenta nuevamente más tarde.');
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
                message: 'Consumo de la habitacion eliminada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar este consumo de la habitacion:', error.message);
                throw createHttpError(500, 'No se pudo eliminar el consumo de la habitacion. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }
}