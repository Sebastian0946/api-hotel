import { NotFound } from "http-errors";
import dataBase from "../../db";
import { TipoHabitacionService, Query, id } from "../../service/parametrizacionService/TipoHabitacionService";
import { TipoHabitaciones } from "../../entities/parametrizacion/TipoHabitaciones";

export class TipoHabitacionRepository implements TipoHabitacionService<TipoHabitaciones> {

    private repository = dataBase.getRepository(TipoHabitaciones);

    async create(data: Partial<TipoHabitaciones>, query?: Query, file?: Express.Request['file']): Promise<TipoHabitaciones> {

        try {
            if (file) {
                data.Imagen = file.buffer;
            }
    
            const result = this.repository.create(data);
            await this.repository.save(result);
    
            return result;
        } catch (error) {
            throw new Error('Failed to create tipo habitacion');
        }
        
    }

    async list(query?: Query): Promise<TipoHabitaciones[]> {
        try {
            const result = await this.repository.find();
            return result;
        } catch (error) {
            throw new Error('Failed to retrieve tipo habitaciones');
        }
    }

    async get(id: id, query?: Query): Promise<TipoHabitaciones> {
        try {
            const result = await this.repository.findOneBy({ id: id as any });

            if (!result) {
                throw new NotFound("TipoHabitaciones not found");
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve tipo habitacion');
        }
    }

    async update(id: id, data: TipoHabitaciones, query?: Query): Promise<TipoHabitaciones> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("tipo_habitaciones")
                .where("tipo_habitaciones.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("tipo_habitaciones.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("TipoHabitaciones not found");
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update tipo habitacion');
        }
    }

    async remove(id: id, query?: Query): Promise<TipoHabitaciones> {
        try {
            const result = await this.get(id, query);
            await this.repository.remove(result);
            return result;
        } catch (error) {
            throw new Error('Failed to remove tipo habitacion');
        }
    }
}