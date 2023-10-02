import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';

import { InventarioRepository } from "../../repository/invetarioRepository/InventarioRepository";
import createHttpError from "http-errors";
@JsonController('/inventario')
export class InventarioController {

    constructor(private repository: InventarioRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            if (!body.Codigo || !body.Cantidad || !body.ProductoId || !body.PrecioProveedor || !body.PrecioVenta) {
                throw createHttpError(400, 'Los campos Codigo, Cantidad, ProductoId, PrecioProveedor y PrecioVenta son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Inventario creado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear el inventario:', error.message);
                throw createHttpError(500, 'No se pudo crear el inventario. Por favor, intenta nuevamente más tarde.');
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
                message: 'Inventario listado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al listar el inventario:', error.message);
                throw createHttpError(500, 'No se pudo listar el inventario. Por favor, intenta nuevamente más tarde.');
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
                message: 'Inventario encontrado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al encontrar el inventario:', error.message);
                throw createHttpError(500, 'No se pudo encontrar el inventario. Por favor, intenta nuevamente más tarde.');
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

            if (!body.Codigo || !body.Cantidad || !body.ProductoId || !body.PrecioProveedor || !body.PrecioVenta) {
                throw createHttpError(400, 'Los campos Codigo, Cantidad, ProductoId, PrecioProveedor y PrecioVenta son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Inventario actualizado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar el inventario:', error.message);
                throw createHttpError(500, 'No se pudo actualizar el inventario. Por favor, intenta nuevamente más tarde.');
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
                message: 'Inventario eliminado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar el inventario:', error.message);
                throw createHttpError(500, 'No se pudo elimiar el inventario. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }
}