import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { Personas } from "../../entities/seguridad/Personas";


export class PersonaRepository implements DatabaseRepository<Personas> {

    async create(data: Partial<Personas>, query?: Query ): Promise<Personas> {

       const repository =  dataBase.getRepository(Personas);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<Personas[]> {

        const repository =  dataBase.getRepository(Personas);

        return repository.find();
    }
    
    async get(id: id, query?: Query ): Promise<Personas> {

        const repository =  dataBase.getRepository(Personas);

        const result = await repository.findOneBy({id: id as any});

        if(!result) {
            throw new NotFound("Persona not Found")
        };

        return result;
    }

    async update(id: id, data: Personas, query?: Query ): Promise<Personas> {
        
        const repository =  dataBase.getRepository(Personas);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query | undefined): Promise<Personas> {

        const repository =  dataBase.getRepository(Personas);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}