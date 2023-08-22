import { NotFound } from "http-errors";
import dataBase from "../../db";
import { RolService, Query, id } from "../../service/seguridadService/RolService";
import { Roles } from "../../entities/seguridad/Roles";
import { error } from "console";

export class RolRepository implements RolService<Roles> {

    private repository = dataBase.getRepository(Roles);

    async create(data: Partial<Roles>, query?: Query): Promise<Roles> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            throw new Error('Failed to create role: ' + error);
        }
    }

    async list(query?: Query): Promise<Roles[]> {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new Error('Failed to retrieve roles: ' + error);
        }
    }

    async get(id: id, query?: Query): Promise<Roles> {
        try {
            const result = await this.repository.findOneBy({id: id as any});

            if (!result) {
                throw new NotFound('Role not found'+ error);
            }

            return result;
            
        } catch (error) {
            throw new Error('Failed to retrieve role: ' + error);
        }
    }

    async update(id: id, data: Roles, query?: Query): Promise<Roles> {
        try {
            const queryBuilder = this.repository.createQueryBuilder('roles')
                .where('roles.id = :id', { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere('roles.someColumn = :value', { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning('*').execute();

            if (result.affected === 0) {
                throw new NotFound('Role not found');
            }

            return result.raw[0];

        } catch (error) {
            throw new Error('Failed to update role: ' + error );
        }
    }

    async remove(id: id, query?: Query): Promise<Roles> {
        try {
            const result = await this.get(id, query);

            await this.repository.delete(id);

            return result;

        } catch (error) {
            throw new Error('Failed to remove role: ' + error);
        }
    }
}