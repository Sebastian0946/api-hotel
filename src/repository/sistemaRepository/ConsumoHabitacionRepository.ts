import { NotFound } from "http-errors";
import dataBase from "../../db";
import { ConsumoHabitacionService, Query, id } from "../../service/sistemaSerivce/ConsumoHabitacionService";
import { ConsumoHabitaciones } from "../../entities/sistema/ConsumoHabitaciones";
import { Estado } from "../../entities/ModelEntity";
import { InventariosHabitaciones } from "../../entities/inventario/InventariosHabitaciones";

export class ConsumoHabitacionRepository implements ConsumoHabitacionService<ConsumoHabitaciones> {

    private repository = dataBase.getRepository(ConsumoHabitaciones);


    async create(data: Partial<ConsumoHabitaciones>, query?: Query): Promise<ConsumoHabitaciones> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            throw error;
        }
    }

    async list(query?: Query): Promise<ConsumoHabitaciones[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("ConsumoHabitaciones")
                .leftJoinAndSelect("ConsumoHabitaciones.ReservaHabitacionesId", "ReservaHabitaciones")
                .leftJoinAndSelect("ReservaHabitaciones.HabitacionId", "Habitaciones")
                .leftJoinAndSelect("ReservaHabitaciones.DescuentoId", "Descuentos")
                .leftJoinAndSelect("Habitaciones.HuespedId", "Huespedes")
                .leftJoinAndSelect("Huespedes.PersonaId", "Personas")
                .leftJoinAndSelect("Habitaciones.TipoHabitacionesId", "TipoHabitaciones")
                .orderBy("ConsumoHabitaciones.id", "ASC");

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
                .leftJoinAndSelect("ConsumoHabitaciones.ReservaHabitacionesId", "ReservaHabitaciones")
                .leftJoinAndSelect("ReservaHabitaciones.HabitacionId", "Habitaciones")
                .leftJoinAndSelect("ReservaHabitaciones.DescuentoId", "Descuentos")
                .leftJoinAndSelect("Habitaciones.HuespedId", "Huespedes")
                .leftJoinAndSelect("Huespedes.PersonaId", "Personas")
                .leftJoinAndSelect("Habitaciones.TipoHabitacionesId", "TipoHabitaciones")
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

    async checkOut(id: id, query?: Query): Promise<ConsumoHabitaciones> {
        try {

            interface ConsumoHabitacionConInventarios extends ConsumoHabitaciones {
                inventariosHabitacion?: InventariosHabitaciones[];
            }

            const consumoHabitacionRepository = dataBase.getRepository(ConsumoHabitaciones);
            const consumoHabitacion: ConsumoHabitacionConInventarios | null = await consumoHabitacionRepository.createQueryBuilder('ConsumoHabitaciones')
                .leftJoinAndSelect('consumoHabitaciones.ReservaHabitacionesId', 'ReservaHabitaciones')
                .leftJoinAndSelect('ReservaHabitaciones.HabitacionId', 'Habitaciones')
                .leftJoinAndSelect('Habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                .leftJoinAndSelect('Habitaciones.HuespedId', 'Huespedes')
                .where('ConsumoHabitaciones.id = :id', { id })
                .getOne();

            if (!consumoHabitacion) {
                throw new Error('Consumo de habitación no encontrado.');
            }

            if (consumoHabitacion) {

                const habitacionId = consumoHabitacion.ReservaHabitacionesId.HabitacionId.id;

                if (habitacionId) {
                    const inventarioHabitacionRepository = dataBase.getRepository(InventariosHabitaciones);
                    const inventariosDeHabitacion = await inventarioHabitacionRepository
                        .createQueryBuilder('InventariosHabitaciones')
                        .where('InventariosHabitaciones.HabitacionId = :habitacionId', { habitacionId })
                        .getMany();

                    consumoHabitacion['inventariosHabitacion'] = inventariosDeHabitacion;
                }
            }

            return consumoHabitacion;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Error al realizar el checkout: ' + error.message);
            } else {
                throw new Error('Error al realizar el checkout.');
            }
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
