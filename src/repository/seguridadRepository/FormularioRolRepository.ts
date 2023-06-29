import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { FormulariosRoles } from "../../entities/seguridad/FormulariosRoles";


export class FormularioRolRepository implements DatabaseRepository<FormulariosRoles> {

    async create(data: Partial<FormulariosRoles>, query?: Query ): Promise<FormulariosRoles> {

       const repository =  dataBase.getRepository(FormulariosRoles);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<FormulariosRoles[]> {

        const repository =  dataBase.getRepository(FormulariosRoles);

        const queryBuilder = repository.createQueryBuilder('FormulariosRoles')
        .leftJoinAndSelect('FormulariosRoles.RolesId', 'Roles')
        .leftJoinAndSelect('FormulariosRoles.FormulariosId', 'Formularios');
    
        const result = await queryBuilder.getMany();
    
        return result;
    }
    
    async get(id: id, query?: Query ): Promise<FormulariosRoles> {

        const repository =  dataBase.getRepository(FormulariosRoles);

        const queryBuilder = repository.createQueryBuilder('FormulariosRoles')
        .leftJoinAndSelect('FormulariosRoles.RolesId', 'Roles')
        .leftJoinAndSelect('FormulariosRoles.FormulariosId', 'Formularios')
        .where('FormulariosRoles.id = :id', { id });
      
        const result = await queryBuilder.getOne();
      
        if (!result) {
          throw new NotFound('FormularioRol not found');
        }
        return result;
    }

    async update(id: id, data: FormulariosRoles, query?: Query ): Promise<FormulariosRoles> {
        
        const repository =  dataBase.getRepository(FormulariosRoles);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query | undefined): Promise<FormulariosRoles> {

        const repository =  dataBase.getRepository(FormulariosRoles);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}