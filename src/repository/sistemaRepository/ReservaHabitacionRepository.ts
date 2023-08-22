import { NotFound } from "http-errors";
import dataBase from "../../db";
import { ReservaHabitacionService, Query, id } from "../../service/sistemaSerivce/ReservaHabitacionService";
import { ReservaHabitaciones } from "../../entities/sistema/ReservaHabitaciones";

export class ReservaHabitacionRepository implements ReservaHabitacionService<ReservaHabitaciones> {

    async create(data: Partial<ReservaHabitaciones>, query?: Query): Promise<ReservaHabitaciones> {
        try {
            const repository = dataBase.getRepository(ReservaHabitaciones);
            const result = repository.create(data);
            await repository.save(result);
            return result;
        } catch (error) {
            throw new Error('Failed to create ReservaHabitaciones');
        }
    }

    async list(query?: Query): Promise<ReservaHabitaciones[]> {
        try {
            const repository = dataBase.getRepository(ReservaHabitaciones);
            const queryBuilder = repository.createQueryBuilder('ReservaHabitaciones')
                .leftJoinAndSelect('ReservaHabitaciones.EstadoFacturaId', 'EstadoFacturas')
                .leftJoinAndSelect('ReservaHabitaciones.HabitacionId', 'Habitaciones')
                .leftJoinAndSelect('ReservaHabitaciones.HuespedId', 'Huespedes')
                .leftJoinAndSelect('ReservaHabitaciones.DescuentoId', 'Descuentos');

            const result = await queryBuilder.getMany();
            return result;
        } catch (error) {
            throw new Error('Failed to retrieve ReservaHabitaciones');
        }
    }

    async get(id: id, query?: Query): Promise<ReservaHabitaciones> {
        try {
            const repository = dataBase.getRepository(ReservaHabitaciones);
            const queryBuilder = repository.createQueryBuilder('ReservaHabitaciones')
                .leftJoinAndSelect('ReservaHabitaciones.EstadoFacturaId', 'EstadoFacturas')
                .leftJoinAndSelect('ReservaHabitaciones.HabitacionId', 'Habitaciones')
                .leftJoinAndSelect('ReservaHabitaciones.HuespedId', 'Huespedes')
                .leftJoinAndSelect('ReservaHabitaciones.DescuentoId', 'Descuentos')
                .where('ReservaHabitaciones.id = :id', { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound('ReservaHabitaciones not found');
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve ReservaHabitaciones');
        }
    }

    async update(id: id, data: ReservaHabitaciones, query?: Query): Promise<ReservaHabitaciones> {
        try {
            const repository = dataBase.getRepository(ReservaHabitaciones);

            const queryBuilder = repository.createQueryBuilder('ReservaHabitaciones')
                .where('ReservaHabitaciones.id = :id', { id });

            if (query) {
                // Aquí puedes agregar condiciones adicionales según la consulta
                // Por ejemplo:
                if (query.someCondition) {
                    queryBuilder.andWhere('ReservaHabitaciones.someColumn = :value', { value: query.someValue });
                }
            }

            const result = await queryBuilder.update().set(data).returning('*').execute();

            if (result.affected === 0) {
                throw new NotFound('ReservaHabitaciones not found');
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update ReservaHabitaciones');
        }
    }

    async remove(id: id, query?: Query | undefined): Promise<ReservaHabitaciones> {
        try {
            const repository = dataBase.getRepository(ReservaHabitaciones);
            const result = await this.get(id, query);
            await repository.delete(id);
            return result;
        } catch (error) {
            throw new Error('Failed to remove ReservaHabitaciones');
        }
    }
}