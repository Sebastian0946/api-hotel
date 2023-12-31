import { NotFound } from "http-errors";
import dataBase from "../../db";
import { InventarioHabitacionService, Query, id } from "../../service/inventarioService/InventarioHabitacionService";
import { InventariosHabitaciones } from "../../entities/inventario/InventariosHabitaciones";
import { Estado } from "../../entities/ModelEntity";

export class InventarioHabitacionRepository implements InventarioHabitacionService<InventariosHabitaciones> {

    private repository = dataBase.getRepository(InventariosHabitaciones);

    async create(data: Partial<InventariosHabitaciones>, query?: Query): Promise<InventariosHabitaciones> {
        try {
            const result = this.repository.create(data);
            await this.repository.save(result);
            return result;
        } catch (error) {
            throw new Error('Failed to create inventario habitacion');
        }
    }

    async list(query?: Query): Promise<InventariosHabitaciones[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("InventariosHabitaciones")
                .leftJoinAndSelect("InventariosHabitaciones.InventarioId", "Inventarios")
                .leftJoinAndSelect("Inventarios.ProductoId", "Productos")
                .leftJoinAndSelect("InventariosHabitaciones.AdministracionHabitacionId", "Habitaciones")
                .orderBy("InventariosHabitaciones.id", "ASC"); 

            const result = await queryBuilder.getMany();

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve inventarios habitaciones');
        }
    }


    async get(id: id, query?: Query): Promise<InventariosHabitaciones> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("InventariosHabitaciones")
                .leftJoinAndSelect("InventariosHabitaciones.InventarioId", "Inventarios")
                .leftJoinAndSelect("Inventarios.ProductoId", "Productos")
                .leftJoinAndSelect("InventariosHabitaciones.AdministracionHabitacionId", "Habitaciones")
                .where("InventariosHabitaciones.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("InventarioHabitacion not found");
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve inventario habitacion');
        }
    }

    async update(id: id, data: InventariosHabitaciones, query?: Query): Promise<InventariosHabitaciones> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("inventarios_habitaciones")
                .where("inventarios_habitaciones.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("inventarios_habitaciones.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("InventarioHabitacion not found");
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update inventario habitacion');
        }
    }

    async remove(id: id, query?: Query): Promise<InventariosHabitaciones> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("inventarios_habitaciones")
                .where("inventarios_habitaciones.id = :id", { id });

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