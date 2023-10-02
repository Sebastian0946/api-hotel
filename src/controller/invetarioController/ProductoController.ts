import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete } from 'routing-controllers';
import { ProductoRepository } from "../../repository/invetarioRepository/ProductoRepository";
import createHttpError from "http-errors";
@JsonController('/produco')
export class ProductoController {

    constructor(private repository: ProductoRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            if (!body.Imagen || !body.Codigo || !body.Nombre || !body.CategoriaId) {
                throw createHttpError(400, 'Los campos Imagen, Codigo, Nombre y CategoriaId son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Producto creado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear el producto:', error.message);
                throw createHttpError(500, 'No se pudo crear el producto. Por favor, intenta nuevamente más tarde.');
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
                message: 'Productos obtenidos exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al obtener los producto:', error.message);
                throw createHttpError(500, 'No se pudo obtener los producto. Por favor, intenta nuevamente más tarde.');
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

            const result = await this.repository.get(id);

            res.status(200).json({
                message: 'Producto encontrado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al encontrar el producto:', error.message);
                throw createHttpError(500, 'No se pudo encontrar el producto. Por favor, intenta nuevamente más tarde.');
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

            if (!body.Imagen || !body.Codigo || !body.Nombre || !body.CategoriaId) {
                throw createHttpError(400, 'Los campos Imagen, Codigo, Nombre y CategoriaId son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }
            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Producto actualizado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar el producto:', error.message);
                throw createHttpError(500, 'No se pudo actualizar el producto. Por favor, intenta nuevamente más tarde.');
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
                message: 'Producto eliminado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar el producto:', error.message);
                throw createHttpError(500, 'No se pudo eliminar el producto. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }
}