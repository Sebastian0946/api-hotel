import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Body } from 'routing-controllers';


import { UsuarioRepository } from "../../repository/seguridadRepository/UsuarioRepository";
@JsonController('/usuario')
export class UsuarioController {

    constructor(private repository: UsuarioRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            const result = await this.repository.create(body);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    @Get()
    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.repository.list();

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    @Get('/:id')
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const result = await this.repository.get(id)

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    @Put('/:id')
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const body = req.body;

            const result = await this.repository.update(id, body);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    @Delete('/:id')
    async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const result = await this.repository.remove(id);

            res.status(200).json(result);
        } catch (error) {
            next(error);
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