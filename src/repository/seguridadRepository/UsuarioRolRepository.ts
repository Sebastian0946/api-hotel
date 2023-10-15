import { NotFound } from "http-errors";
import dataBase from "../../db";
import { UsuarioRolService, Query, id } from "../../service/seguridadService/UsuarioRolService";
import { UsuariosRoles } from "../../entities/seguridad/UsuariosRoles";
import { Estado } from "../../entities/ModelEntity";

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
            const queryBuilder = this.repository.createQueryBuilder("UsuariosRoles")
                .leftJoinAndSelect("UsuariosRoles.RolesId", "Roles")
                .leftJoinAndSelect("UsuariosRoles.UsuariosId", "Usuarios");

            return queryBuilder.getMany();
        } catch (error) {
            throw new Error('No se pudo recuperar el rol de usuario: ' + error);
        }
    }

    async get(id: id, query?: Query): Promise<UsuariosRoles> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("UsuariosRoles")
                .leftJoinAndSelect("UsuariosRoles.RolesId", "Roles")
                .leftJoinAndSelect("UsuariosRoles.UsuariosId", "Usuarios")
                .where("UsuariosRoles.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("UsuarioRol not found");
            }

            return result;
        } catch (error) {
            throw new Error('No se pudo recuperar el rol de usuario: ' + error);
        }
    }

    async update(id: id, data: UsuariosRoles, query?: Query): Promise<UsuariosRoles> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Usuarios_Roles")
                .where("Usuarios_Roles.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("UsuariosRoles.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("UsuarioRol not found");
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('No se pudo recuperar el rol de usuario: ' + error);
        }
    }

    async remove(id: id, query?: Query): Promise<UsuariosRoles> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("usuarios_roles")
                .where("Usuarios.id = :id", { id });

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