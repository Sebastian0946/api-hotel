import { NotFound } from "http-errors";
import dataBase from "../../db";
import { HabitacionService, Query, id } from "../../service/sistemaSerivce/HabitacionService";
import { Habitaciones } from "../../entities/sistema/Habitaciones";
import { Estado } from "../../entities/ModelEntity";

export class HabitacionRepository implements HabitacionService<Habitaciones> {

    private repository = dataBase.getRepository(Habitaciones);

    async create(data: Partial<Habitaciones>, query?: Query): Promise<Habitaciones> {
        try {
            const repository = dataBase.getRepository(Habitaciones);
            const result = repository.create(data);
            await repository.save(result);
            return result;
        } catch (error) {
            throw new Error('Failed to create habitacion');
        }
    }

    async list(query?: Query): Promise<Habitaciones[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder('Habitaciones')
                .leftJoinAndSelect('Habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                .leftJoinAndSelect('Habitaciones.HuespedId', 'huespedes')
                .leftJoinAndSelect('huespedes.PersonaId', 'personas')
                .orderBy('Habitaciones.id', 'ASC'); 

            const result = await queryBuilder.getMany();
            return result;
        } catch (error) {
            throw new Error('Failed to retrieve habitaciones');
        }
    }


    async get(id: id, query?: Query): Promise<Habitaciones> {
        try {
            const repository = dataBase.getRepository(Habitaciones);
            const queryBuilder = repository.createQueryBuilder('Habitaciones')
                .leftJoinAndSelect('Habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                .leftJoinAndSelect('Habitaciones.HuespedId', 'huespedes')
                .leftJoinAndSelect('huespedes.PersonaId', 'personas')
                .where('Habitaciones.id = :id', { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound('Habitacion not found');
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve habitacion');
        }
    }

    async update(id: id, data: Habitaciones, query?: Query): Promise<Habitaciones> {
        try {
            const repository = dataBase.getRepository(Habitaciones);

            const queryBuilder = repository.createQueryBuilder('Habitaciones')
                .where('Habitaciones.id = :id', { id });

            if (query) {
                // Aquí puedes agregar condiciones adicionales según la consulta
                // Por ejemplo:
                if (query.someCondition) {
                    queryBuilder.andWhere('Habitaciones.someColumn = :value', { value: query.someValue });
                }
            }

            const result = await queryBuilder.update().set(data).returning('*').execute();

            if (result.affected === 0) {
                throw new NotFound('Habitaciones not found');
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update habitacion');
        }
    }

    async remove(id: id, query?: Query): Promise<Habitaciones> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Habitaciones")
                .where("Habitaciones.id = :id", { id });

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