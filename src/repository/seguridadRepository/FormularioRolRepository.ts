import { NotFound } from "http-errors";
import dataBase from "../../db";
import { FormularioRolService, Query, id } from "../../service/seguridadService/FormularioRolService";
import { FormulariosRoles } from "../../entities/seguridad/FormulariosRoles";

export class FormularioRolRepository implements FormularioRolService<FormulariosRoles> {

    private repository = dataBase.getRepository(FormulariosRoles);

    async create(data: Partial<FormulariosRoles>, query?: Query): Promise<FormulariosRoles> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el rol de formulario: ' + error);
        }
    }

    async list(query?: Query): Promise<FormulariosRoles[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("formularios_roles")
                .leftJoinAndSelect("formularios_roles.rol_id", "roles")
                .leftJoinAndSelect("formularios_roles.formulario_id", "formularios");

            const result = await queryBuilder.getMany();

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el rol de formulario: ' + error);
        }
    }

    async get(id: id, query?: Query): Promise<FormulariosRoles> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("formularios_roles")
                .leftJoinAndSelect("formularios_roles.rol_id", "roles")
                .leftJoinAndSelect("formularios_roles.formulario_id", "formularios")
                .where("formularios_roles.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("FormularioRol not found");
            }

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el rol de formulario: ' + error);
        }
    }

    async update(id: id, data: FormulariosRoles, query?: Query): Promise<FormulariosRoles> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("formularios_roles")
                .where("formularios_roles.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("formularios_roles.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("FormularioRol not found");
            }

            return result.raw[0];

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el rol de formulario: ' + error);
        }
    }

    async remove(id: id, query?: Query): Promise<FormulariosRoles> {
        try {
            const result = await this.get(id, query);

            await this.repository.delete(id);

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el rol de formulario: ' + error);
        }
    }
}