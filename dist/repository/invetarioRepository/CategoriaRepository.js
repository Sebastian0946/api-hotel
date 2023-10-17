"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const Categorias_1 = require("../../entities/inventario/Categorias");
const ModelEntity_1 = require("../../entities/ModelEntity");
class CategoriaRepository {
    constructor() {
        this.repository = db_1.default.getRepository(Categorias_1.Categorias);
    }
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = this.repository.create(data);
                yield this.repository.save(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to create categoria');
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder('Categorias');
                queryBuilder.orderBy('Categorias.id', 'ASC');
                const categorías = yield queryBuilder.getMany();
                return categorías;
            }
            catch (error) {
                throw new Error('Failed to retrieve categorías');
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Categorias")
                    .where("Categorias.id = :id", { id });
                const result = yield queryBuilder.getOne();
                if (!result) {
                    throw new http_errors_1.NotFound("Categoria no encontrada");
                }
                return result;
            }
            catch (error) {
                throw new Error('Fallo al traer Categoria');
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Categorias")
                    .where("Categorias.id = :id", { id });
                if (query && query.someCondition) {
                    queryBuilder.andWhere("Categorias.someColumn = :value", { value: query.someValue });
                }
                const result = yield queryBuilder.update().set(data).returning("*").execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound("Categorias not found");
                }
                return result.raw[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Categorias")
                    .where("Categorias.id = :id", { id });
                const result = yield queryBuilder.update()
                    .set({ Estado: ModelEntity_1.Estado.Desactivado, fecha_eliminacion: new Date() })
                    .returning("*")
                    .execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound("Categoría no encontrada");
                }
                return result.raw[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CategoriaRepository = CategoriaRepository;
