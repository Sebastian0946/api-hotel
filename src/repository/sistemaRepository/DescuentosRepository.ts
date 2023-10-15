import { NotFound } from "http-errors";
import dataBase from "../../db";
import { DescuentoService, Query, id } from "../../service/sistemaSerivce/DescuentoService";
import { Descuentos } from "../../entities/sistema/Descuentos";
import { Estado } from "../../entities/ModelEntity";

export class DescuentosRepository implements DescuentoService<Descuentos> {

    private repository = dataBase.getRepository(Descuentos);

    async create(data: Partial<Descuentos>, query?: Query): Promise<Descuentos> {
        try {
            const repository = dataBase.getRepository(Descuentos);
            const result = repository.create(data);
            await repository.save(result);
            return result;
        } catch (error) {
            throw new Error('Failed to create descuento');
        }
    }

    async list(query?: Query): Promise<Descuentos[]> {
        try {
            const repository = dataBase.getRepository(Descuentos);
            const result = await repository.find();
            return result;
        } catch (error) {
            throw new Error('Failed to retrieve descuentos');
        }
    }

    async get(id: id, query?: Query): Promise<Descuentos> {
        try {
            const repository = dataBase.getRepository(Descuentos);
            const result = await repository.findOneBy({ id: id as any });

            if (!result) {
                throw new NotFound("Descuento not found");
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve descuento');
        }
    }

    async update(id: id, data: Descuentos, query?: Query): Promise<Descuentos> {
        try {
            const repository = dataBase.getRepository(Descuentos);

            const queryBuilder = repository.createQueryBuilder('Descuentos')
                .where('Descuentos.id = :id', { id });

            if (query) {
                // Aquí puedes agregar condiciones adicionales según la consulta
                // Por ejemplo:
                if (query.someCondition) {
                    queryBuilder.andWhere('Descuentos.someColumn = :value', { value: query.someValue });
                }
            }

            const result = await queryBuilder.update().set(data).returning('*').execute();

            if (result.affected === 0) {
                throw new NotFound('Descuentos not found');
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update descuento');
        }
    }

    async remove(id: id, query?: Query): Promise<Descuentos> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Descuentos")
                .where("Descuentos.id = :id", { id });

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