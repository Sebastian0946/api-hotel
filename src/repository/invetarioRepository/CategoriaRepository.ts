import { NotFound } from "http-errors";
import dataBase from "../../db";
import { CategoriaService, Query, id } from "../../service/inventarioService/CategoriaService";
import { Categorias } from "../../entities/inventario/Categorias";

export class CategoriaRepository implements CategoriaService<Categorias> {

    private repository = dataBase.getRepository(Categorias);

    async create(data: Partial<Categorias>, query?: Query): Promise<Categorias> {
        try {
            const result = this.repository.create(data);
            await this.repository.save(result);
            return result;
        } catch (error) {
            throw new Error('Failed to create categoria');
        }
    }

    async list(query?: Query): Promise<Categorias[]> {
        try {
            return this.repository.find();
        } catch (error) {
            throw new Error('Failed to retrieve categorias');
        }
    }

    async get(id: id, query?: Query): Promise<Categorias> {
        try {
            const result = await this.repository.findOneBy({id: id as any});

            if (!result) {
                throw new NotFound("Categoria not found");
            }

            return result;
        } catch (error) {
            throw new Error('Failed to retrieve categoria');
        }
    }

    async update(id: id, data: Categorias, query?: Query): Promise<Categorias> {
        try {
            const queryBuilder = this.repository.createQueryBuilder("categorias")
                .where("categorias.id = :id", { id });

            if (query && query.someCondition) {
                queryBuilder.andWhere("categorias.someColumn = :value", { value: query.someValue });
            }

            const result = await queryBuilder.update().set(data).returning("*").execute();

            if (result.affected === 0) {
                throw new NotFound("Categorias not found");
            }

            return result.raw[0];

        } catch (error) {
            // Manejar la excepción adecuadamente
            throw error;
        }
    }

    async remove(id: id, query?: Query): Promise<Categorias> {
        try {
            const result = await this.get(id, query);
            await this.repository.remove(result);
            return result;
        } catch (error) {
            throw new Error('Failed to remove categoria');
        }
    }
}
