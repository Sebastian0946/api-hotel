import { NotFound } from "http-errors";
import dataBase from "../../db";
import { InventarioService, Query, id } from "../../service/inventarioService/InventarioService";
import { Inventarios } from "../../entities/inventario/Inventarios";

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
            const queryBuilder = this.repository.createQueryBuilder("inventarios")
                .leftJoinAndSelect("inventarios.producto_id", "productos");

            const result = await queryBuilder.getMany();

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve inventarios');
        }
    }

    async get(id: id, query?: Query): Promise<Inventarios> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("inventarios")
                .leftJoinAndSelect("inventarios.producto_id", "productos")
                .where("inventarios.id = :id", { id });

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
            const queryBuilder = this.repository.createQueryBuilder("inventarios")
                .where("inventarios.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("inventarios.someColumn = :value", { value: query.someValue });
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
            const result = await this.get(id, query);

            await this.repository.remove(result);

            return result;
            
        } catch (error) {
            throw new Error('Failed to remove inventario');
        }
    }
}