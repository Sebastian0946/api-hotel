import { NotFound } from "http-errors";
import dataBase from "../../db";
import { HuespedService, Query, id } from "../../service/sistemaSerivce/HuespedService";
import { Huespedes } from "../../entities/sistema/Huespedes";

export class HuespedRepository implements HuespedService<Huespedes> {

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
                .leftJoinAndSelect('Huespedes.UsuarioId', 'Usuarios');

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
                .leftJoinAndSelect('Huespedes.UsuarioId', 'Usuarios')
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
                // Aquí puedes agregar condiciones adicionales según la consulta
                // Por ejemplo:
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
            const repository = dataBase.getRepository(Huespedes);
            const result = await this.get(id, query);
            await repository.remove(result);
            return result;
        } catch (error) {
            throw new Error('Failed to remove huesped');
        }
    }
}