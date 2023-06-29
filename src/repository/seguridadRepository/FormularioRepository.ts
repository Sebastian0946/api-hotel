import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { Formularios } from "../../entities/seguridad/Formularios";


export class FormularioRepository implements DatabaseRepository<Formularios> {

    async create(data: Partial<Formularios>, query?: Query ): Promise<Formularios> {

       const repository =  dataBase.getRepository(Formularios);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<Formularios[]> {

        const repository =  dataBase.getRepository(Formularios);
      
        const queryBuilder = repository.createQueryBuilder('Formularios')
        .leftJoinAndSelect('Formularios.ModuloId', 'Modulos');
    
        const result = await queryBuilder.getMany();
    
        return result;
    }
    
    async get(id: id, query?: Query ): Promise<Formularios> {

        const repository =  dataBase.getRepository(Formularios);


        const queryBuilder = repository.createQueryBuilder('Formularios')
        .leftJoinAndSelect('Formularios.ModuloId', 'Modulos')
        .where('Formularios.id = :id', { id });
    
        const result = await queryBuilder.getOne();
    
        if (!result) {
            throw new NotFound('Formulario not found');
        }
        return result;
    }

    async update(id: id, data: Formularios, query?: Query ): Promise<Formularios> {
        
        const repository =  dataBase.getRepository(Formularios);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query | undefined): Promise<Formularios> {

        const repository =  dataBase.getRepository(Formularios);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}