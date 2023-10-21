import { NotFound } from "http-errors";
import dataBase from "../../db";
import { ReservaHabitacionService, Query, id } from "../../service/sistemaSerivce/ReservaHabitacionService";
import { ReservaHabitaciones } from "../../entities/sistema/ReservaHabitaciones";
import { Estado } from "../../entities/ModelEntity";
import { QueryFailedError } from "typeorm";

export class ReservaHabitacionRepository implements ReservaHabitacionService<ReservaHabitaciones> {

    private repository = dataBase.getRepository(ReservaHabitaciones);

    async create(data: Partial<ReservaHabitaciones>, query?: Query): Promise<ReservaHabitaciones> {
        try {
            const repository = dataBase.getRepository(ReservaHabitaciones);

            if (data.FechaEntrada && data.FechaSalida && await this.reservasSeSuperponen(data.FechaEntrada, data.FechaSalida)) {
                throw new Error('Las fechas de entrada y salida se superponen con reservas existentes.');
            }

            const result = repository.create(data);

            await repository.save(result);

            return result;

        } catch (error) {
            if (error instanceof QueryFailedError) {
                throw new Error('Error al ejecutar la consulta en la base de datos: ' + error.message);
            } else {
                throw error;
            }
        }
    }

    async list(query?: Query): Promise<ReservaHabitaciones[]> {
        try {
            const repository = dataBase.getRepository(ReservaHabitaciones);
            const queryBuilder = repository.createQueryBuilder('ReservaHabitaciones')
                .leftJoinAndSelect('ReservaHabitaciones.HabitacionId', 'Habitaciones')
                .leftJoinAndSelect('Habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                .leftJoinAndSelect('Habitaciones.HuespedId', 'huespedes')
                .leftJoinAndSelect('huespedes.PersonaId', 'personas')
                .leftJoinAndSelect('ReservaHabitaciones.DescuentoId', 'Descuentos')
                .orderBy('ReservaHabitaciones.id', 'ASC');

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

    async getCodigo(Codigo: string, query?: Query): Promise<ReservaHabitaciones> {

        try {

            const repository = dataBase.getRepository(ReservaHabitaciones);

            const queryBuilder = repository.createQueryBuilder('ReservaHabitaciones')
            .where('ReservaHabitaciones.codigo = :Codigo', { Codigo });

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

    async reservasSeSuperponen(fechaEntrada: Date, fechaSalida: Date): Promise<boolean> {
        const repository = dataBase.getRepository(ReservaHabitaciones);

        // Convierte fechaEntrada y fechaSalida en objetos Date si no lo son
        if (!(fechaSalida instanceof Date)) {
            fechaSalida = new Date(fechaSalida);
        }
        if (!(fechaEntrada instanceof Date)) {
            fechaEntrada = new Date(fechaEntrada);
        }

        if (isNaN(fechaEntrada.getTime()) || isNaN(fechaSalida.getTime())) {
            throw new Error('Las fechas de entrada y salida no son válidas.');
        }

        const unDia = 24 * 60 * 60 * 1000;
        const diferenciaDias = (fechaSalida.getTime() - fechaEntrada.getTime()) / unDia;

        console.log('Diferencia en días:', diferenciaDias);

        const reservasSuperpuestas = await repository
            .createQueryBuilder('ReservaHabitaciones')
            .where('(:fechaEntrada <= ReservaHabitaciones.FechaSalida) AND (:fechaSalida >= ReservaHabitaciones.FechaEntrada)', {
                fechaEntrada,
                fechaSalida,
            })
            .andWhere(`(:diferenciaDias > 0)`, {
                diferenciaDias,
            })
            .getCount();
        return reservasSuperpuestas > 0;
    }
}