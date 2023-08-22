import { NotFound } from "http-errors";
import dataBase from "../../db";
import { UsuarioRolService, Query, id } from "../../service/seguridadService/UsuarioRolService";
import { UsuariosRoles } from "../../entities/seguridad/UsuariosRoles";

export class UsuarioRolRepository implements UsuarioRolService<UsuariosRoles> {

    private repository = dataBase.getRepository(UsuariosRoles);

    async create(data: Partial<UsuariosRoles>, query?: Query): Promise<UsuariosRoles> {
        try {
            const result = this.repository.create(data);
            await this.repository.save(result);
            return result;
        } catch (error) {
            throw new Error('Failed to create usuarioRol: ' + error);
        }
    }

    async list(query?: Query): Promise<UsuariosRoles[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("usuarios_roles")
                .leftJoinAndSelect("usuarios_roles.rol_id", "roles")
                .leftJoinAndSelect("usuarios_roles.usuario_id", "usuarios");

            return queryBuilder.getMany();
        } catch (error) {
            throw new Error('No se pudo recuperar el rol de usuario: ' +  error);
        }
    }

    async get(id: id, query?: Query): Promise<UsuariosRoles> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("usuarios_roles")
                .leftJoinAndSelect("usuarios_roles.rol_id", "roles")
                .leftJoinAndSelect("usuarios_roles.usuario_id", "usuarios")
                .where("usuarios_roles.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("UsuarioRol not found");
            }

            return result;
        } catch (error) {
            throw new Error('No se pudo recuperar el rol de usuario: ' +  error);
        }
    }

    async update(id: id, data: UsuariosRoles, query?: Query): Promise<UsuariosRoles> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Usuarios_Roles")
                .where("Usuarios_Roles.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("Usuarios_Roles.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("UsuarioRol not found");
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('No se pudo recuperar el rol de usuario: ' +  error);
        }
    }

    async remove(id: id, query?: Query): Promise<UsuariosRoles> {
        try {
            const result = await this.get(id, query);

            await this.repository.delete(id);

            return result;

        } catch (error) {
            throw new Error('No se pudo recuperar el rol de usuario: ' +  error);
        }
    }
}