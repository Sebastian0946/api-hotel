import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { Inventarios } from "../../entities/inventario/Inventarios";

export class inventarioRepository implements DatabaseRepository<Inventarios> {

    async create(data: Partial<Inventarios>, query?: Query ): Promise<Inventarios> {

       const repository =  dataBase.getRepository(Inventarios);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<Inventarios[]> {

        const repository =  dataBase.getRepository(Inventarios);

        const queryBuilder = repository.createQueryBuilder('Inventarios')
        .leftJoinAndSelect('Inventarios.ProductoId', 'Productos');
    
        const result = await queryBuilder.getMany();
    
        return result;
    }
    
    async get(id: id, query?: Query ): Promise<Inventarios> {

        const repository =  dataBase.getRepository(Inventarios);

        const queryBuilder = repository.createQueryBuilder('Inventarios')
        .leftJoinAndSelect('Inventarios.ProductoId', 'Productos')
        .where('Inventarios.id = :id', { id });
    
        const result = await queryBuilder.getOne();
    
        if (!result) {
            throw new NotFound('Inventario not found');
        }
        return result;
    }

    async update(id: id, data: Inventarios, query?: Query ): Promise<Inventarios> {
        
        const repository =  dataBase.getRepository(Inventarios);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query | undefined): Promise<Inventarios> {

        const repository =  dataBase.getRepository(Inventarios);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}