import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete } from 'routing-controllers';

import { CategoriaRepository } from "../../repository/invetarioRepository/CategoriaRepository";
import createHttpError from "http-errors";

@JsonController('/categoria')
export class CategoriaController {

    constructor(private repository: CategoriaRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {

            const { Codigo, Descripcion } = req.body;

            if (!Codigo || !Descripcion) {
                throw createHttpError(400, 'Los campos Codigo y Descripcion son obligatorios.');
            }

            const result = await this.repository.create(req.body);

            res.status(201).json({
                message: 'Categoria creada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear la categoria:', error.message);
                throw createHttpError(500, 'No se pudo crear la categoria. Por favor, intenta nuevamente más tarde.');
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
                message: 'Categorias obtenidos exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener las categorias:', error.message);
                throw createHttpError(500, 'No se pudo listar las categorias. Por favor, intenta nuevamente más tarde.');
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
                message: 'Categoria encontrado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al encontrar la categoria:', error.message);
                throw createHttpError(500, 'No se pudo encontrar la categoria. Por favor, intenta nuevamente más tarde.');
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

            // Validar que los campos Codigo y Descripcion no sean nulos o vacíos
            if (!body.Codigo || !body.Descripcion) {
                throw createHttpError(400, 'Los campos Codigo y Descripcion son obligatorios. Por favor, asegúrese de completar ambos campos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Categoria actualizada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar la categoria:', error.message);
                throw createHttpError(500, 'No se pudo actualizar la categoria. Por favor, intenta nuevamente más tarde.');
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
                message: 'Categoria eliminada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar la categoria:', error.message);
                throw createHttpError(500, 'No se pudo eliminar la categoria. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }
}