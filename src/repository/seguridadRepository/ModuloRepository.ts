import { NotFound } from "http-errors";
import dataBase from "../../db";
import { ModulosService, Query, id } from "../../service/seguridadService/ModuloService";
import { Modulos } from "../../entities/seguridad/Modulos";
import { Estado } from "../../entities/ModelEntity";

export class ModuloRepository implements ModulosService<Modulos> {
    private repository = dataBase.getRepository(Modulos);

    async create(data: Partial<Modulos>, query?: Query): Promise<Modulos> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el modulo: ' + error);
        }
    }

    async list(query?: Query): Promise<Modulos[]> {
        try {
            const result = await this.repository.find();

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el modulo: ' + error);
        }
    }

    async get(id: id, query?: Query): Promise<Modulos> {
        try {
            const result = await this.repository.findOneBy({ id: id as any });

            if (!result) {
                throw new NotFound("Modulo not found");
            }

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el modulo: ' + error);
        }
    }

    async update(id: id, data: Modulos, query?: Query): Promise<Modulos> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Modulos")
                .where("Modulos.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("Modulos.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("Modulo not found");
            }

            return result.raw[0];

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw new Error('No se pudo recuperar el modulo: ' + error);
        }
    }

    async remove(id: id, query?: Query): Promise<Modulos> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Modulos")
                .where("Modulos.id = :id", { id });

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