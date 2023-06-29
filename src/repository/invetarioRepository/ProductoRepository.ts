import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { Productos } from "../../entities/inventario/Productos";


export class ProductoRepository implements DatabaseRepository<Productos> {

    async create(data: Partial<Productos>, query?: Query ): Promise<Productos> {

       const repository =  dataBase.getRepository(Productos);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<Productos[]> {

        const repository =  dataBase.getRepository(Productos);

        const queryBuilder = repository.createQueryBuilder('Productos')
        .leftJoinAndSelect('Productos.CategoriaId', 'Categorias');
    
        const result = await queryBuilder.getMany();
    
        return result;
    }
    
    async get(id: id, query?: Query ): Promise<Productos> {

        const repository =  dataBase.getRepository(Productos);

        const queryBuilder = repository.createQueryBuilder('Productos')
        .leftJoinAndSelect('Productos.CategoriaId', 'Categorias')
        .where('Productos.id = :id', { id });
    
        const result = await queryBuilder.getOne();
    
        if (!result) {
            throw new NotFound('Producto not found');
        }
        return result;
    }

    async update(id: id, data: Productos, query?: Query ): Promise<Productos> {
        
        const repository =  dataBase.getRepository(Productos);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query | undefined): Promise<Productos> {

        const repository =  dataBase.getRepository(Productos);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}