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
            const queryBuilder = repository.createQueryBuilder('reserva_habitaciones')
                .leftJoinAndSelect('huespedes.huesped_id', 'huespedes')
                .leftJoinAndSelect('huespedes.descuento_id', 'descuentos')
                .leftJoinAndSelect('huespedes.habitacion_id', 'habitaciones')
                .leftJoinAndSelect('huespedes.estadoFactura_id', 'estado_facturas')

            const result = await queryBuilder.getMany();
            return result;
        } catch (error) {
            throw new Error('Failed to retrieve ReservaHabitaciones');
        }
    }

    async get(id: id, query?: Query): Promise<ReservaHabitaciones> {
        try {
            const repository = dataBase.getRepository(ReservaHabitaciones);
            const queryBuilder = repository.createQueryBuilder('reserva_habitaciones')
                .leftJoinAndSelect('huespedes.huesped_id', 'huespedes')
                .leftJoinAndSelect('huespedes.descuento_id', 'descuentos')
                .leftJoinAndSelect('huespedes.habitacion_id', 'habitaciones')
                .leftJoinAndSelect('huespedes.estadoFactura_id', 'estado_facturas')
                .where('reserva_habitaciones.id = :id', { id });

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

            const queryBuilder = repository.createQueryBuilder('reserva_habitaciones')
                .leftJoinAndSelect('huespedes.huesped_id', 'huespedes')
                .leftJoinAndSelect('huespedes.descuento_id', 'descuentos')
                .leftJoinAndSelect('huespedes.habitacion_id', 'habitaciones')
                .leftJoinAndSelect('huespedes.estadoFactura_id', 'estado_facturas')
                .where('reserva_habitaciones.id = :id', { id });

            if (query) {

                if (query.someCondition) {
                    queryBuilder.andWhere('reserva_habitaciones.someColumn = :value', { value: query.someValue });
                }
            }

            const result = await queryBuilder.update().set(data).returning('*').execute();

            if (result.affected === 0) {
                throw new NotFound('reserva_habitaciones not found');
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