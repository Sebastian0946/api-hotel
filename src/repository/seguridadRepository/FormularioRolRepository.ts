import { NotFound } from "http-errors";
import dataBase from "../../db";
import { FormularioRolService, Query, id } from "../../service/seguridadService/FormularioRolService";
import { FormulariosRoles } from "../../entities/seguridad/FormulariosRoles";
import { Estado } from "../../entities/ModelEntity";

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
            const queryBuilder = this.repository.createQueryBuilder("FormulariosRoles")
                .leftJoinAndSelect("FormulariosRoles.RolesId", "Roles")
                .leftJoinAndSelect("FormulariosRoles.FormulariosId", "Formularios");

            const result = await queryBuilder.getMany();

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el rol de formulario: ' + error);
        }
    }

    async get(id: id, query?: Query): Promise<FormulariosRoles> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("FormulariosRoles")
                .leftJoinAndSelect("FormulariosRoles.RolesId", "Roles")
                .leftJoinAndSelect("FormulariosRoles.FormulariosId", "Formularios")
                .where("FormulariosRoles.id = :id", { id });

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
            const queryBuilder = this.repository.createQueryBuilder("Formularios_Roles")
                .where("Formularios_Roles.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("FormulariosRoles.someColumn = :value", { value: query.someValue });
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
            const queryBuilder = this.repository.createQueryBuilder("formularios_roles")
                .where("formularios_roles.id = :id", { id });

            const result = await queryBuilder.update()
                .set({ Estado: Estado.Desactivado, fecha_eliminacion: new Date() })
                .returning("*")
                .execute();

            if (result.affected === 0) {
                throw new NotFound("Producto no encontrada");
            }

            return result.raw[0];
        } catch (error) {
            throw error;
        }
    }
}