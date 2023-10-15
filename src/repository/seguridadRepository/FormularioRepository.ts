import { NotFound } from "http-errors";
import dataBase from "../../db";
import { FormularioService, Query, id } from "../../service/seguridadService/FormularioService";
import { Formularios } from "../../entities/seguridad/Formularios";
import { Estado } from "../../entities/ModelEntity";

export class FormularioRepository implements FormularioService<Formularios> {

    private repository = dataBase.getRepository(Formularios);

    async create(data: Partial<Formularios>, query?: Query): Promise<Formularios> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('Error al crea el formulario, observa los campos' + error);
        }
    }

    async list(query?: Query): Promise<Formularios[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Formularios")
                .leftJoinAndSelect("Formularios.ModuloId", "Modulos");

            const result = await queryBuilder.getMany();

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el formulario: ' + error);
        }
    }

    async get(id: id, query?: Query): Promise<Formularios> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Formularios")
                .leftJoinAndSelect("Formularios.ModuloId", "Modulos")
                .where("Formularios.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("Formulario not found");
            }

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el formulario: ' + error);
        }
    }

    async update(id: id, data: Formularios, query?: Query): Promise<Formularios> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Formularios")
                .where("Formularios.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("Formularios.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("Formulario not found");
            }

            return result.raw[0];

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el formulario: ' + error);
        }
    }

    async remove(id: id, query?: Query): Promise<Formularios> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Formularios")
                .where("Formularios.id = :id", { id });

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