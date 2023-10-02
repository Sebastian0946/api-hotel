import { Request, Response, NextFunction } from "express"

import { TipoHabitacionRepository } from "../../repository/parametrizacionRepository/TipoHabitacionRepostiroty";
import createHttpError from "http-errors";
import { Delete, Get, Post, Put } from "routing-controllers";

export class TipoHabitacionesController {

    constructor(private repository: TipoHabitacionRepository) { }


    @Post()
    async create(req: Request, res: Response, next: NextFunction) {

        try {
            const body = req.body;

            if (!body.Codigo || !body.Descripcion || !body.Cantidad) {
                throw createHttpError(400, 'Los campos Codigo, Descripcion y Cantidad son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Tipo habitación creado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear la Tipo habitación:', error.message);
                throw createHttpError(500, 'No se pudo crear la Tipo habitación. Por favor, intenta nuevamente más tarde.');
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
                message: 'Tipo habitaciónes creadas exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al listar las Tipo de habitaciónes:', error.message);
                throw createHttpError(500, 'No se pudo listar las Tipo de habitaciónes. Por favor, intenta nuevamente más tarde.');
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
                message: 'Tipo habitación encontrada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al encontrar la Tipo de habitación:', error.message);
                throw createHttpError(500, 'No se pudo encontrar la Tipo de habitación. Por favor, intenta nuevamente más tarde.');
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

            if (!body.Codigo || !body.Descripcion || !body.Cantidad) {
                throw createHttpError(400, 'Los campos Codigo, Descripcion y Cantidad son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Tipo habitación actualizada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar la Tipo de habitación:', error.message);
                throw createHttpError(500, 'No se pudo actualizar las Tipo de habitaciónes. Por favor, intenta nuevamente más tarde.');
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
                message: 'Tipo habitación eliminada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar la Tipo de habitación:', error.message);
                throw createHttpError(500, 'No se pudo eliminar las Tipo de habitaciónes. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }

    }
}