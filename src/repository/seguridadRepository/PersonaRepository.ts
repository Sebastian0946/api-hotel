import { NotFound } from "http-errors";
import dataBase from "../../db";
import { PersonaService, Query, id } from "../../service/seguridadService/PersonaService";
import { Personas } from "../../entities/seguridad/Personas";
import { Estado } from "../../entities/ModelEntity";

export class PersonaRepository implements PersonaService<Personas> {

    private repository = dataBase.getRepository(Personas);

    async create(data: Partial<Personas>, query?: Query): Promise<Personas> {
        try {
            const result = this.repository.create(data);

            await this.repository.save(result);

            return result;

        } catch (error) {
            throw new Error('Error al crea la persona, observa los campos' + error);
        }
    }

    async list(query?: Query): Promise<Personas[]> {
        try {
            return await this.repository.find();
        } catch (error) {
            throw new Error('Failed to retrieve personas');
        }
    }

    async get(id: id, query?: Query): Promise<Personas> {
        try {
            const result = await this.repository.findOneBy({ id: id as any });

            if (!result) {
                throw new NotFound('Persona not found');
            }

            return result;

        } catch (error) {
            throw new Error('Failed to retrieve persona');
        }
    }

    async findByDocumento(documento: string, query?: Query): Promise<Personas | null> {
        try {

            const documentoNumber = parseInt(documento, 10);
            if (isNaN(documentoNumber)) {
                return null;
            }

            const result = await this.repository.findOneBy({ Documento: documentoNumber });

            return result || null;

        } catch (error) {

            throw new Error('Failed to retrieve persona by documento');

        }
    }


    async update(id: id, data: Personas, query?: Query): Promise<Personas> {
        try {
            const queryBuilder = this.repository.createQueryBuilder('Personas')
                .where('Personas.id = :id', { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere('Personas.someColumn = :value', { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning('*').execute();

            if (result.affected === 0) {
                throw new NotFound('Persona not found');
            }

            return result.raw[0];
        } catch (error) {
            throw new Error('Failed to update persona');
        }
    }

    async remove(id: id, query?: Query): Promise<Personas> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("Personas")
                .where("Personas.id = :id", { id });

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