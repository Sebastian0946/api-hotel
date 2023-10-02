import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';

import { ConfiguracionSistemaRepository } from "../../repository/parametrizacionRepository/ConfiguracionSistemaRepostiroty";
import createHttpError from "http-errors";

@JsonController('/configuracionSistema')
export class ConfiguracionSistemaController {

    constructor(private repository: ConfiguracionSistemaRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            if (!body.UsuarioId || !body.Codigo || !body.Nombre || !body.Descripcion ) {
                throw createHttpError(400, 'Los campos UsuarioId, Codigo, Nombre y Descripcion son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Configuracion habitacion creado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear la Configuracion de la habitacion:', error.message);
                throw createHttpError(500, 'No se pudo crear la Configuracion de la habitacion. Por favor, intenta nuevamente más tarde.');
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
                message: 'Configuracion habitacion listado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al listar la Configuracion de la habitacion:', error.message);
                throw createHttpError(500, 'No se pudo listar la Configuracion de la habitacion. Por favor, intenta nuevamente más tarde.');
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
                message: 'Configuracion habitacion encontrada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al encontrar la Configuracion de la habitacion:', error.message);
                throw createHttpError(500, 'No se pudo encontrar la Configuracion de la habitacion. Por favor, intenta nuevamente más tarde.');
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

            if (!body.UsuarioId || !body.Codigo || !body.Nombre || !body.Descripcion ) {
                throw createHttpError(400, 'Los campos UsuarioId, Codigo, Nombre y Descripcion son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Configuracion habitacion actualizada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar la Configuracion de la habitacion:', error.message);
                throw createHttpError(500, 'No se pudo actualizar la Configuracion de la habitacion. Por favor, intenta nuevamente más tarde.');
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
                message: 'Configuracion habitacion eliminada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar la Configuracion de la habitacion:', error.message);
                throw createHttpError(500, 'No se pudo eliminar la Configuracion de la habitacion. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }
}