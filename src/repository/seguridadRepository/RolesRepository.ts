import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { Roles } from "../../entities/seguridad/Roles";


export class RolRepository implements DatabaseRepository<Roles> {

    async create(data: Partial<Roles>, query?: Query ): Promise<Roles> {

       const repository =  dataBase.getRepository(Roles);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<Roles[]> {

        const repository =  dataBase.getRepository(Roles);

        return repository.find();
    }
    
    async get(id: id, query?: Query ): Promise<Roles> {

        const repository =  dataBase.getRepository(Roles);

        const result = await repository.findOneBy({id: id as any});

        if(!result) {
            throw new NotFound("Rol not Found")
        };

        return result;
    }

    async update(id: id, data: Roles, query?: Query ): Promise<Roles> {
        
        const repository =  dataBase.getRepository(Roles);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query | undefined): Promise<Roles> {

        const repository =  dataBase.getRepository(Roles);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}