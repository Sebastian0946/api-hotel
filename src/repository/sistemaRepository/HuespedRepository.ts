import { NotFound } from "http-errors";
import dataBase from "../../db";
import { HuespedService, Query, id } from "../../service/sistemaSerivce/HuespedService";
import { Huespedes } from "../../entities/sistema/Huespedes";
import { Estado } from "../../entities/ModelEntity";

export class HuespedRepository implements HuespedService<Huespedes> {

    private repository = dataBase.getRepository(Huespedes);

    async create(data: Partial<Huespedes>, query?: Query): Promise<Huespedes> {
        try {

            const repository = dataBase.getRepository(Huespedes);

            const result = repository.create(data);

            await repository.save(result);

            return result;

        } catch (error) {
            throw new Error('Failed to create huesped');
        }
    }

    async list(query?: Query): Promise<Huespedes[]> {
        try {
            const repository = dataBase.getRepository(Huespedes);
            const queryBuilder = repository.createQueryBuilder('Huespedes')
                .leftJoinAndSelect('Huespedes.PersonaId', 'Personas')
                .leftJoinAndSelect('Huespedes.DescuentoId', 'Descuento');

            const result = await queryBuilder.getMany();
            return result;
        } catch (error) {
            throw new Error('Failed to retrieve huespedes');
        }
    }

    async get(id: id, query?: Query): Promise<Huespedes> {
        try {
            const repository = dataBase.getRepository(Huespedes);
            const queryBuilder = repository.createQueryBuilder('Huespedes')
                .leftJoinAndSelect('Huespedes.PersonaId', 'Personas')
                .leftJoinAndSelect('Huespedes.DescuentoId', 'Descuento')
                .where('Huespedes.id = :id', { id });

            const result = await queryBuilder.getOne();

            if (!result) {
                throw new NotFound('Huespedes not found');
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve huesped');
        }
    }

    async update(id: id, data: Huespedes, query?: Query): Promise<Huespedes> {
        try {
            const repository = dataBase.getRepository(Huespedes);

            const queryBuilder = repository.createQueryBuilder('Huespedes')
                .where('Huespedes.id = :id', { id });

            if (query) {
                if (query.someCondition) {
                    queryBuilder.andWhere('Huespedes.someColumn = :value', { value: query.someValue });
                }
            }

            const result = await queryBuilder.update().set(data).returning('*').execute();

            if (result.affected === 0) {
                throw new NotFound('Huespedes not found');
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update huesped');
        }
    }

    async remove(id: id, query?: Query): Promise<Huespedes> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Huespedes")
                .where("Huespedes.id = :id", { id });

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