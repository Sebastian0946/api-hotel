import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete } from 'routing-controllers';

import { CategoriaRepository } from "../../repository/invetarioRepository/CategoriaRepository";
import createHttpError from "http-errors";
import { ValidationError } from "class-validator";

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
        } catch (error: unknown) {
            if (error instanceof ValidationError) {
                // Error de validación (por ejemplo, datos faltantes o inválidos)
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
                message: 'Categorias obtenidos exitosamente',
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
                message: 'Categoria encontrado exitosamente',
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

            if (!body.Codigo || !body.Descripcion) {
                throw createHttpError(400, 'Los campos Codigo y Descripcion son obligatorios. Por favor, asegúrese de completar ambos campos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Categoria actualizada exitosamente',
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

            const isCategoryInUse = await this.repository.isCategoryInUse(id);

            if (isCategoryInUse) {
                return res.status(409).json({
                    message: 'Categoría en uso'
                });
            }

            const result = await this.repository.remove(id);

            return res.status(200).json({
                message: 'Categoría eliminada exitosamente',
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