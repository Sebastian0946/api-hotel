import { NotFound } from "http-errors";
import dataBase from "../../db";
import { ConfiguracionSistemaService, Query, id } from "../../service/parametrizacionService/ConfiguracionSistemaService";
import { ConfiguracionSistema } from "../../entities/parametrizacion/ConfiguracionSistema";
import { Estado } from "../../entities/ModelEntity";

export class ConfiguracionSistemaRepository implements ConfiguracionSistemaService<ConfiguracionSistema> {

    private repository = dataBase.getRepository(ConfiguracionSistema);

    async create(data: Partial<ConfiguracionSistema>, query?: Query): Promise<ConfiguracionSistema> {
        try {
            const result = this.repository.create(data);
            await this.repository.save(result);
            return result;
        } catch (error) {
            throw new Error('Failed to create configuracion sistema');
        }
    }

    async list(query?: Query): Promise<ConfiguracionSistema[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("ConfiguracionSistema")
                .leftJoinAndSelect("ConfiguracionSistema.UsuarioId", "Usuarios")
                .orderBy("ConfiguracionSistema.id", "ASC"); 

            const result = await queryBuilder.getMany();

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve configuraciones sistema');
        }
    }


    async get(id: id, query?: Query): Promise<ConfiguracionSistema> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("ConfiguracionSistema")
                .leftJoinAndSelect("ConfiguracionSistema.UsuarioId", "Usuarios")
                .where("ConfiguracionSistema.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("ConfiguracionSistema not found");
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve configuracion sistema');
        }
    }

    async update(id: id, data: ConfiguracionSistema, query?: Query): Promise<ConfiguracionSistema> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("configuracion_sistema")
                .where("configuracion_sistema.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("configuracion_sistema.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("ConfiguracionSistema not found");
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update configuracion sistema');
        }
    }

    async remove(id: id, query?: Query): Promise<ConfiguracionSistema> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("configuracion_sistema")
                .where("configuracion_sistema.id = :id", { id });

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