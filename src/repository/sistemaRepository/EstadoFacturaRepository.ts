import { NotFound } from "http-errors";
import dataBase from "../../db";
import { EstadoFacturaService, Query, id } from "../../service/sistemaSerivce/EstadoFacturaService";
import { EstadoFacturas } from "../../entities/sistema/EstadoFacturas";
import { Estado } from "../../entities/ModelEntity";

export class EstadoFacturaRepository implements EstadoFacturaService<EstadoFacturas> {

    private repository = dataBase.getRepository(EstadoFacturas);

    async create(data: Partial<EstadoFacturas>, query?: Query): Promise<EstadoFacturas> {
        try {
            const repository = dataBase.getRepository(EstadoFacturas);
            const result = repository.create(data);
            await repository.save(result);
            return result;
        } catch (error) {
            throw new Error('Failed to create estado factura');
        }
    }

    async list(query?: Query): Promise<EstadoFacturas[]> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("EstadoFacturas")
                .orderBy("EstadoFacturas.id", "ASC"); 

            const result = await queryBuilder.getMany();

            return result;
        } catch (error) {
            throw error;
        }
    }

    async get(id: id, query?: Query): Promise<EstadoFacturas> {
        try {
            const repository = dataBase.getRepository(EstadoFacturas);
            const result = await repository.findOneBy({ id: id as any });

            if (!result) {
                throw new NotFound("EstadoFactura not found");
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve estado factura');
        }
    }

    async update(id: id, data: EstadoFacturas, query?: Query): Promise<EstadoFacturas> {
        try {
            const repository = dataBase.getRepository(EstadoFacturas);

            const queryBuilder = repository.createQueryBuilder('estado_facturas')
                .where('estado_facturas.id = :id', { id });

            if (query) {
                if (query.someCondition) {
                    queryBuilder.andWhere('estado_facturas.someColumn = :value', { value: query.someValue });
                }
            }

            const result = await queryBuilder.update().set(data).returning('*').execute();

            if (result.affected === 0) {
                throw new NotFound('EstadoFacturas not found');
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update estado factura');
        }
    }

    async remove(id: id, query?: Query): Promise<EstadoFacturas> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("estado_facturas")
                .where("estado_facturas.id = :id", { id });

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