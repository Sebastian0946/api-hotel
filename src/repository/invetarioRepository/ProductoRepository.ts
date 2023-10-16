import dataBase from "../../db";
import { ProductoService, Query, id } from "../../service/inventarioService/ProductoService";
import { Productos } from "../../entities/inventario/Productos";
import createHttpError from "http-errors";
import { NotFound } from "http-errors";
import { Estado } from "../../entities/ModelEntity";
import { NotFoundError } from "routing-controllers";

export class ProductoRepository implements ProductoService<Productos> {

    private repository = dataBase.getRepository(Productos);

    async create(data: Partial<Productos>, query?: Query): Promise<Productos> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            throw createHttpError(500, 'No se pudo crear el producto. Por favor, intenta nuevamente más tarde.');
        }
    }

    async list(query?: Query): Promise<Productos[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Productos")
                .leftJoinAndSelect("Productos.CategoriaId", "Categorias")
                .orderBy("Productos.id", "ASC"); // Ordena por el ID de Productos en orden ascendente

            const result = await queryBuilder.getMany();

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve productos');
        }
    }

    async get(id: id, query?: Query): Promise<Productos> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Productos")
                .leftJoinAndSelect("Productos.CategoriaId", "Categorias")
                .where("Productos.id = :id", { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFoundError("Producto not found");
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve producto');
        }
    }

    async update(id: id, data: Productos, query?: Query): Promise<Productos> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Productos")
                .where("Productos.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("Productos.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFoundError("Producto not found");
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update producto');
        }
    }

    async remove(id: id, query?: Query): Promise<Productos> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Productos")
                .where("Productos.id = :id", { id });

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