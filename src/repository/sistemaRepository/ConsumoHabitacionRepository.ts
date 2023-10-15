import { NotFound } from "http-errors";
import dataBase from "../../db";
import { ConsumoHabitacionService, Query, id } from "../../service/sistemaSerivce/ConsumoHabitacionService";
import { ConsumoHabitaciones } from "../../entities/sistema/ConsumoHabitaciones";
import { Estado } from "../../entities/ModelEntity";

export class ConsumoHabitacionRepository implements ConsumoHabitacionService<ConsumoHabitaciones> {

    private repository = dataBase.getRepository(ConsumoHabitaciones);

    async create(data: Partial<ConsumoHabitaciones>, query?: Query): Promise<ConsumoHabitaciones> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw error;
        }
    }

    async list(query?: Query): Promise<ConsumoHabitaciones[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("ConsumoHabitaciones")
                .leftJoinAndSelect("ConsumoHabitaciones.ProductoId", "Productos")
                .leftJoinAndSelect("ConsumoHabitaciones.ReservaHabitacionesId", "ReservaHabitaciones");

            const result = await queryBuilder.getMany();

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw error;
        }
    }

    async get(id: id, query?: Query): Promise<ConsumoHabitaciones> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("ConsumoHabitaciones")
                .leftJoinAndSelect("ConsumoHabitaciones.ProductoId", "Productos")
                .leftJoinAndSelect("ConsumoHabitaciones.ReservaHabitacionesId", "ReservaHabitaciones")
                .where("ConsumoHabitaciones.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("ConsumoHabitacion not found");
            }

            return result;

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw error;
        }
    }

    async update(id: id, data: ConsumoHabitaciones, query?: Query): Promise<ConsumoHabitaciones> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("ConsumoHabitaciones")
                .where("ConsumoHabitaciones.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("ConsumoHabitaciones.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("ConsumoHabitaciones not found");
            }

            return result.raw[0];

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw error;
        }
    }

    async remove(id: id, query?: Query): Promise<ConsumoHabitaciones> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("consumo_habitaciones")
                .where("consumo_habitaciones.id = :id", { id });

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
