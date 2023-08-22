import { NotFound } from "http-errors";
import dataBase from "../../db";
import { ProductoService, Query, id } from "../../service/inventarioService/ProductoService";
import { Productos } from "../../entities/inventario/Productos";

export class ProductoRepository implements ProductoService<Productos> {

    private repository = dataBase.getRepository(Productos);

    async create(data: Partial<Productos>, query?: Query): Promise<Productos> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            throw new Error('Failed to create producto');
        }
    }

    async list(query?: Query): Promise<Productos[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("productos")
                .leftJoinAndSelect("productos.categoria_id", "categorias");

            return queryBuilder.getMany();
            
        } catch (error) {
            throw new Error('Failed to retrieve productos');
        }
    }

    async get(id: id, query?: Query): Promise<Productos> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("productos")
            .leftJoinAndSelect("productos.categoria_id", "categorias")
            .where("productos.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound("Producto not found");
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve producto');
        }
    }

    async update(id: id, data: Productos, query?: Query): Promise<Productos> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("productos")
                .where("productos.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("productos.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("Producto not found");
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update producto');
        }
    }

    async remove(id: id, query?: Query): Promise<Productos> {
        try {
            const result = await this.get(id, query);

            await this.repository.remove(result);
            
            return result;

        } catch (error) {
            throw new Error('Failed to remove producto');
        }
    }
}