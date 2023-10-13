import { Request, Response, NextFunction } from "express";
import { JsonController, Get, Post, Put, Delete, Param, Res } from 'routing-controllers';

import { PersonaRepository } from "../../repository/seguridadRepository/PersonaRepository";
import createHttpError from "http-errors";

@JsonController('/persona')
export class PersonaController {

    constructor(private repository: PersonaRepository) { }

    @Post()
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body;

            if (!body.TipoDocumento || !body.Documento || !body.Nombres || !body.Apellidos || !body.Email || !body.Direccion || !body.Telefono) {
                throw createHttpError(400, 'Los campos TipoDocumento, Documento, Nombres, Apellidos, Email, Direccion y Telefono son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.create(body);

            res.status(201).json({
                message: 'Persona creada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al crear la persona:', error.message);
                throw createHttpError(500, 'No se pudo crear la persona. Por favor, intenta nuevamente más tarde.');
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
                message: 'Personas listadas exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al listar las personas:', error.message);
                throw createHttpError(500, 'No se pudo listar las personas. Por favor, intenta nuevamente más tarde.');
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
                message: 'Persona encontrada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al encontrar la persona:', error.message);
                throw createHttpError(500, 'No se pudo encontrar la persona. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }

    @Get(':documento')
    async findDocument(req: Request, res: Response, next: NextFunction) {
        try {
            const { documento } = req.params;

            const result = await this.repository.findByDocumento(documento);
    
            if (result) {
                return res.status(200).json({
                    message: 'Persona encontrada exitosamente',
                    data: result
                });
            } else {
                return res.status(404).json({ 
                    message: 'Persona no encontrada' 
                });
            }
        } catch (error) {
            console.error('Error al encontrar la persona:', error);
            return res.status(500).json({ message: 'Ocurrió un error al buscar la persona. Por favor, intenta nuevamente más tarde.' });
        }
    }
    

    @Put('/:id')
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const body = req.body;

            if (!body.TipoDocumento || !body.Documento || !body.Nombres || !body.Apellidos || !body.Email || !body.Direccion || !body.Telefono) {
                throw createHttpError(400, 'Los campos TipoDocumento, Documento, Nombres, Apellidos, Email, Direccion y Telefono son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
            }

            const result = await this.repository.update(id, body);

            res.status(200).json({
                message: 'Persona actualizada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al actualizar la persona:', error.message);
                throw createHttpError(500, 'No se pudo actualizar la persona. Por favor, intenta nuevamente más tarde.');
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
                message: 'Persona eliminada exitosamente',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error al eliminar la persona:', error.message);
                throw createHttpError(500, 'No se pudo eliminar la persona. Por favor, intenta nuevamente más tarde.');
            } else {
                console.error('Error desconocido:', error);
                throw createHttpError(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
            }
        }
    }
}