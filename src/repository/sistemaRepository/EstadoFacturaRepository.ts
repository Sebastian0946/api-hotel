import { NotFound } from "http-errors";
import dataBase from "../../db";
import { EstadoFacturaService, Query, id } from "../../service/sistemaSerivce/EstadoFacturaService";
import { EstadoFacturas } from "../../entities/sistema/EstadoFacturas";

export class EstadoFacturaRepository implements EstadoFacturaService<EstadoFacturas> {

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
            const repository = dataBase.getRepository(EstadoFacturas);
            const result = await repository.find();
            return result;
        } catch (error) {
            throw new Error('Failed to retrieve estado facturas');
        }
    }

    async get(id: id, query?: Query): Promise<EstadoFacturas> {
        try {
            const repository = dataBase.getRepository(EstadoFacturas);
            const result = await repository.findOneBy({id: id as any});

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

            const queryBuilder = repository.createQueryBuilder('EstadoFacturas')
                .where('EstadoFacturas.id = :id', { id });

            if (query) {
                // Aquí puedes agregar condiciones adicionales según la consulta
                // Por ejemplo:
                if (query.someCondition) {
                    queryBuilder.andWhere('EstadoFacturas.someColumn = :value', { value: query.someValue });
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
            const repository = dataBase.getRepository(EstadoFacturas);
            const result = await this.get(id, query);
            await repository.remove(result);
            return result;
        } catch (error) {
            throw new Error('Failed to remove estado factura');
        }
    }
}