import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';

import { HuespedRepository } from "../../repository/sistemaRepository/HuespedRepository";
import createHttpError from "http-errors";

@JsonController('/huesped')
export class HuespedController {

    constructor(private repository: HuespedRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            if (!body.Codigo || !body.PersonaId) {
                throw createHttpError(400, 'Los campos v son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Huesped creado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear el huesped:', error.message);
                throw createHttpError(500, 'No se pudo crear el huesped. Por favor, intenta nuevamente más tarde.');
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
                message: 'Huespedes listados exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al listar los huespedes:', error.message);
                throw createHttpError(500, 'No se pudo listar los huespedes. Por favor, intenta nuevamente más tarde.');
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
                message: 'Huesped obtenido exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener el huesped:', error.message);
                throw createHttpError(500, 'No se pudo obtener el huesped. Por favor, intenta nuevamente más tarde.');
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

            if (!body.Codigo || !body.PersonaId) {
                throw createHttpError(400, 'Los campos Codigo y PersonaId son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Huesped actualizado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar el huesped:', error.message);
                throw createHttpError(500, 'No se pudo actualizar el huesped. Por favor, intenta nuevamente más tarde.');
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
                message: 'Huesped eliminado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar el huesped:', error.message);
                throw createHttpError(500, 'No se pudo eliminar el huesped. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }
}