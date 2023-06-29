import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { Categorias } from "../../entities/inventario/Categorias";


export class CategoriaRepository implements DatabaseRepository<Categorias> {

    async create(data: Partial<Categorias>, query?: Query ): Promise<Categorias> {

       const repository =  dataBase.getRepository(Categorias);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<Categorias[]> {

        const repository =  dataBase.getRepository(Categorias);

        return repository.find();
    }
    
    async get(id: id, query?: Query ): Promise<Categorias> {

        const repository =  dataBase.getRepository(Categorias);

        const result = await repository.findOneBy({id: id as any});

        if(!result) {
            throw new NotFound("Usuario not Found")
        };

        return result;
    }

    async update(id: id, data: Categorias, query?: Query ): Promise<Categorias> {
        
        const repository =  dataBase.getRepository(Categorias);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query | undefined): Promise<Categorias> {

        const repository =  dataBase.getRepository(Categorias);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}