import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';

import { ModuloRepository } from "../../repository/seguridadRepository/ModuloRepository";
import createHttpError from "http-errors";

@JsonController('/modulo')
export class ModuloController {

    constructor(private repository: ModuloRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            if (!body.Codigo || !body.Ruta || !body.Etiqueta) {
                throw createHttpError(400, 'Los campos Codigo, Ruta y Etiqueta son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Módulo creado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear el módulo:', error.message);
                throw createHttpError(500, 'No se pudo crear el módulo. Por favor, intenta nuevamente más tarde.');
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
                message: 'Módulos listados exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al listar los módulos:', error.message);
                throw createHttpError(500, 'No se pudo listar los módulos. Por favor, intenta nuevamente más tarde.');
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
                message: 'Módulo encontrado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al encontar el módulo:', error.message);
                throw createHttpError(500, 'No se pudo encontrar el módulo. Por favor, intenta nuevamente más tarde.');
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

            if (!body.Codigo || !body.Ruta || !body.Etiqueta) {
                throw createHttpError(400, 'Los campos Codigo, Ruta y Etiqueta son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Módulo actualizado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar el módulo:', error.message);
                throw createHttpError(500, 'No se pudo actualizar el módulo. Por favor, intenta nuevamente más tarde.');
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
                message: 'Módulo eliminado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar el módulo:', error.message);
                throw createHttpError(500, 'No se pudo eliminar el módulo. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }
}