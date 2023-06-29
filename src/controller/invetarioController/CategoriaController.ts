import { Request, Response, NextFunction } from "express"

import { DatabaseRepository } from "../../declaraciones";
import { Categorias } from "../../entities/inventario/Categorias";

export class CategoriaController {
    
    constructor(private repository: DatabaseRepository<Categorias>) {}

    async create(req: Request, res: Response, next: NextFunction){

       try {
            const body = req.body;

            const result = await this.repository.create(body);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    async list(req: Request, res: Response, next: NextFunction){
        
        try {
            const result = await this.repository.list();
            
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }

    }

    async get(req: Request, res: Response, next: NextFunction){
        
        try {
            const {id} = req.params;

            const result = await this.repository.get(id)

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }

    }

    async update(req: Request, res: Response, next: NextFunction){
        
        try {
            const {id} = req.params;
            const body = req.body;

            const result = await this.repository.update(id, body);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }

    }

    async remove(req: Request, res: Response, next: NextFunction){
        
        try {
            const {id} = req.params;

            const result = await this.repository.remove(id);

            res.status(200).json(result);
        } catch (error) {
            next(error);
        }

    }
}