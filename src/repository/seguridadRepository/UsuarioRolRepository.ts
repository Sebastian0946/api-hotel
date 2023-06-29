import { NotFound } from "http-errors";

import dataBase from "../../db";

import { DatabaseRepository, Query, id } from "../../declaraciones";
import { UsuariosRoles } from "../../entities/seguridad/UsuariosRoles";


export class UsuarioRolRepository implements DatabaseRepository<UsuariosRoles> {

    async create(data: Partial<UsuariosRoles>, query?: Query ): Promise<UsuariosRoles> {

       const repository =  dataBase.getRepository(UsuariosRoles);

       const result = repository.create(data);

       await repository.save(result);

       return result;
    }

    async list(query?: Query): Promise<UsuariosRoles[]> {

        const repository =  dataBase.getRepository(UsuariosRoles);

        const queryBuilder = repository.createQueryBuilder('UsuariosRoles')
        .leftJoinAndSelect('UsuariosRoles.RolesId', 'Roles')
        .leftJoinAndSelect('UsuariosRoles.UsuariosId', 'Usuarios');
    
        const result = await queryBuilder.getMany();
    
        return result;
    }
    
    async get(id: id, query?: Query ): Promise<UsuariosRoles> {

        const repository =  dataBase.getRepository(UsuariosRoles);

        const queryBuilder = repository.createQueryBuilder('UsuariosRoles')
        .leftJoinAndSelect('UsuariosRoles.RolesId', 'Roles')
        .leftJoinAndSelect('UsuariosRoles.UsuariosId', 'Usuarios')
        .where('UsuariosRoles.id = :id', { id });
      
        const result = await queryBuilder.getOne();
      
        if (!result) {
          throw new NotFound('UsuarioRol not found');
        }
        return result;
    }

    async update(id: id, data: UsuariosRoles, query?: Query ): Promise<UsuariosRoles> {
        
        const repository =  dataBase.getRepository(UsuariosRoles);

        await repository.update(id, data);

        return this.get(id, query);
    }

    async remove(id: id, query?: Query | undefined): Promise<UsuariosRoles> {

        const repository =  dataBase.getRepository(UsuariosRoles);

        const result = await this.get(id, query);

        await repository.delete(id);

        return result;
    }
}