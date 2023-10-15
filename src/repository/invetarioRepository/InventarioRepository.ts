import { NotFound } from "http-errors";
import dataBase from "../../db";
import { InventarioService, Query, id } from "../../service/inventarioService/InventarioService";
import { Inventarios } from "../../entities/inventario/Inventarios";
import { Estado } from "../../entities/ModelEntity";

export class InventarioRepository implements InventarioService<Inventarios> {

    private repository = dataBase.getRepository(Inventarios);

    async create(data: Partial<Inventarios>, query?: Query): Promise<Inventarios> {
        try {
            const result = this.repository.create(data);
            await this.repository.save(result);
            return result;
        } catch (error) {
            throw new Error('Failed to create inventario');
        }
    }

    async list(query?: Query): Promise<Inventarios[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Inventarios")
                .leftJoinAndSelect("Inventarios.ProductoId", "Productos");

            const result = await queryBuilder.getMany();

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve inventarios');
        }
    }

    async get(id: id, query?: Query): Promise<Inventarios> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Inventarios")
                .leftJoinAndSelect("Inventarios.ProductoId", "Productos")
                .where("Inventarios.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("Inventario not found");
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve inventario');
        }
    }

    async update(id: id, data: Inventarios, query?: Query): Promise<Inventarios> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Inventarios")
                .where("Inventarios.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("Inventarios.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("Inventario not found");
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update inventario');
        }
    }

    async remove(id: id, query?: Query): Promise<Inventarios> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Inventarios")
                .where("Inventarios.id = :id", { id });

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