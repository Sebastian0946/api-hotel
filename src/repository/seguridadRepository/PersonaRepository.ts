import { NotFound } from "http-errors";
import dataBase from "../../db";
import { PersonaService, Query, id } from "../../service/seguridadService/PersonaService";
import { Personas } from "../../entities/seguridad/Personas";
import { Estado } from "../../entities/ModelEntity";
import { Usuarios } from "../../entities/seguridad/Usuarios";
import { Huespedes } from "../../entities/sistema/Huespedes";
import { getRepository } from "typeorm";

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
            const queryBuilder = this.repository.createQueryBuilder("Personas")
                .orderBy("Personas.id", "ASC");

            const result = await queryBuilder.getMany();

            return result;
        } catch (error) {
            throw new Error('No se pudo recuperar la lista de personas: ' + error);
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

            const usuarioRepository = getRepository(Usuarios);
            const huespedRepository = getRepository(Huespedes);

            const usuarioCount = await usuarioRepository
                .createQueryBuilder("usuario")
                .where("usuario.PersonaId = :id", { id })
                .getCount();

            const huespedCount = await huespedRepository
                .createQueryBuilder("huesped")
                .where("huesped.PersonaId = :id", { id })
                .getCount();
            if (usuarioCount > 0 || huespedCount > 0) {
                throw new Error("No se puede desactivar esta persona, tiene una relación");
            }

            const queryBuilder = this.repository.createQueryBuilder("Personas")
                .where("Personas.id = :id", { id });

            const result = await queryBuilder.update()
                .set({ Estado: Estado.Desactivado })
                .returning("*")
                .execute();

            if (result.affected === 0) {
                throw new Error("Persona no encontrada");
            }

            return result.raw[0];
        } catch (error) {
            throw error;
        }
    }
}