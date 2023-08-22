import { NotFound } from "http-errors";
import dataBase from "../../db";
import { FormularioService, Query, id } from "../../service/seguridadService/FormularioService";
import { Formularios } from "../../entities/seguridad/Formularios";

export class FormularioRepository implements FormularioService<Formularios> {
    
    private repository = dataBase.getRepository(Formularios);

    async create(data: Partial<Formularios>, query?: Query): Promise<Formularios> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('Error al crea el formulario, observa los campos' +  error);
        }
    }

    async list(query?: Query): Promise<Formularios[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("formulario")
                .leftJoinAndSelect("formulario.modulo_id", "modulos");

            const result = await queryBuilder.getMany();

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el formulario: ' +  error);
        }
    }

    async get(id: id, query?: Query): Promise<Formularios> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("formularios")
                .leftJoinAndSelect("formulario.modulo_id", "modulos")
                .where("formulario.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("Formulario not found");
            }

            return result;

        } catch (error) {
            throw new Error('No se pudo recuperar el formulario: ' +  error);
        }
    }

    async update(id: id, data: Formularios, query?: Query): Promise<Formularios> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("formularios")
                .where("formularios.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("formularios.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("Formulario not found");
            }

            return result.raw[0];

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el formulario: ' +  error);
        }
    }

    async remove(id: id, query?: Query): Promise<Formularios> {
        try {
            const result = await this.get(id, query);

            await this.repository.delete(id);

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el formulario: ' +  error);
        }
    }
}