import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { Usuarios } from "../../entities/seguridad/Usuarios";


export class UsuarioRepository implements DatabaseRepository<Usuarios> {

    async create(data: Partial<Usuarios>, query?: Query ): Promise<Usuarios> {

       const repository =  dataBase.getRepository(Usuarios);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<Usuarios[]> {

        const repository = dataBase.getRepository(Usuarios);
      
        const queryBuilder = repository.createQueryBuilder('Usuarios')
          .leftJoinAndSelect('Usuarios.PersonaId', 'Personas');
      
        const result = await queryBuilder.getMany();
      
        return result;
      }
      
    
    async get(id: id, query?: Query): Promise<Usuarios> {
        
        const repository = dataBase.getRepository(Usuarios);
      
        const queryBuilder = repository.createQueryBuilder('Usuarios')
          .leftJoinAndSelect('Usuarios.PersonaId', 'persona')
          .where('Usuarios.id = :id', { id });
      
        const result = await queryBuilder.getOne();
      
        if (!result) {
          throw new NotFound('Usuario not found');
        }
        return result;
    }
      
    async update(id: id, data: Usuarios, query?: Query ): Promise<Usuarios> {
        
        const repository =  dataBase.getRepository(Usuarios);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query | undefined): Promise<Usuarios> {

        const repository =  dataBase.getRepository(Usuarios);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}