import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { Modulos } from "../../entities/seguridad/Modulos";


export class ModuloRepository implements DatabaseRepository<Modulos> {

    async create(data: Partial<Modulos>, query?: Query ): Promise<Modulos> {

       const repository =  dataBase.getRepository(Modulos);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<Modulos[]> {

        const repository =  dataBase.getRepository(Modulos);

        return repository.find();
    }
    
    async get(id: id, query?: Query ): Promise<Modulos> {

        const repository =  dataBase.getRepository(Modulos);

        const result = await repository.findOneBy({id: id as any});

        if(!result) {
            throw new NotFound("Modulo not Found")
        };

        return result;
    }

    async update(id: id, data: Modulos, query?: Query ): Promise<Modulos> {
        
        const repository =  dataBase.getRepository(Modulos);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query): Promise<Modulos> {

        const repository =  dataBase.getRepository(Modulos);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}