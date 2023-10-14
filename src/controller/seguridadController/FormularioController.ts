import { Request, Response, NextFunction } from "express"
import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';

import { FormularioRepository } from "../../repository/seguridadRepository/FormularioRepository";
import createHttpError from "http-errors";
import { ValidationError } from "class-validator";
@JsonController('/formulario')
export class FormularioController {

    constructor(private repository: FormularioRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            if (!body.ModuloId || !body.Codigo || !body.Icono || !body.Ruta || !body.Etiqueta) {
                throw createHttpError(400, 'Los campos ModuloId, Codigo, Icono, Ruta y Etiqueta son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Formulario creado exitosamente',
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
                message: 'Formulario alistado exitosamente',
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
                message: 'Formulario encontrado exitosamente',
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

            if (!body.ModuloId || !body.Codigo || !body.Icono || !body.Ruta || !body.Etiqueta) {
                throw createHttpError(400, 'Los campos ModuloId, Codigo, Icono, Ruta y Etiqueta son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Formulario actualizado exitosamente',
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
                message: 'Formulario creado exitosamente',
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