import { NotFound } from "http-errors";
import dataBase from "../../db";
import { ReservaHabitacionService, Query, id } from "../../service/sistemaSerivce/ReservaHabitacionService";
import { ReservaHabitaciones } from "../../entities/sistema/ReservaHabitaciones";
import { Estado } from "../../entities/ModelEntity";

export class ReservaHabitacionRepository implements ReservaHabitacionService<ReservaHabitaciones> {

    private repository = dataBase.getRepository(ReservaHabitaciones);

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
                .leftJoinAndSelect('reserva_habitaciones.EstadoFacturaId', 'EstadoFacturas')
                .leftJoinAndSelect('reserva_habitaciones.HabitacionId', 'Habitaciones')
                .leftJoinAndSelect('Habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                .leftJoinAndSelect('Habitaciones.HuespedId', 'huespedes')
                .leftJoinAndSelect('huespedes.PersonaId', 'personas')
                .leftJoinAndSelect('reserva_habitaciones.DescuentoId', 'Descuentos')
                .orderBy('reserva_habitaciones.id', 'ASC');

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
                .leftJoinAndSelect('Habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                .leftJoinAndSelect('Habitaciones.HuespedId', 'huespedes')
                .leftJoinAndSelect('huespedes.PersonaId', 'personas')
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
            const queryBuilder = this.repository.createQueryBuilder("reserva_habitaciones")
                .where("reserva_habitaciones.id = :id", { id });

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