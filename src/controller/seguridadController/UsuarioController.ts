import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';


import { UsuarioRepository } from "../../repository/seguridadRepository/UsuarioRepository";
import createHttpError from "http-errors";
@JsonController('/usuario')
export class UsuarioController {

    constructor(private repository: UsuarioRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Usuario creado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear el usuario:', error.message);
                throw createHttpError(500, 'No se pudo crear el usuario. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        };
    }


    @Get()
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.repository.list();

            res.status(200).json({
                message: 'Usuarios listados exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al listar los usuarios:', error.message);
                throw createHttpError(500, 'No se pudo listar los usuarios. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    };

    @Get('/:id')
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const result = await this.repository.get(id)

            res.status(200).json({
                message: 'Usuario encontrado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al encontrar el usuario:', error.message);
                throw createHttpError(500, 'No se pudo encontrar el usuario. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    };

    @Put('/:id')
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const body = req.body;

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Usuario actualizado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar el usuario:', error.message);
                throw createHttpError(500, 'No se pudo actualizar el usuario. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    };

    @Delete('/:id')
    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const result = await this.repository.remove(id);

            res.status(200).json({
                message: 'Usuario eliminado exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar el usuario:', error.message);
                throw createHttpError(500, 'No se pudo eliminar el usuario. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    };

    @Get('/permissions/:usuario/:contrasena')
    async getPermission(req: Request, res: Response, next: NextFunction) {
        try {
            const { usuario, contrasena } = req.params;

            const permisos = await this.repository.getPermission(usuario, contrasena);

            res.status(200).json(permisos);

        } catch (error) {
            next(error);
        }
    };

    @Get('/login/:usuario/:contrasena')
    async getLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { usuario, contrasena } = req.params;

            const login = await this.repository.getLogin(usuario, contrasena);

            res.status(200).json(login);

        } catch (error) {
            next(error);
        }
    };
}