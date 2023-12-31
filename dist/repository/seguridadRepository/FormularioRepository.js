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
exports.FormularioRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const Formularios_1 = require("../../entities/seguridad/Formularios");
const ModelEntity_1 = require("../../entities/ModelEntity");
class FormularioRepository {
    constructor() {
        this.repository = db_1.default.getRepository(Formularios_1.Formularios);
    }
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = this.repository.create(data);
                yield this.repository.save(result);
                return result;
            }
            catch (error) {
                // Manejar la excepción adecuadamente
                throw new Error('Error al crea el formulario, observa los campos' + error);
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Formularios")
                    .leftJoinAndSelect("Formularios.ModuloId", "Modulos")
                    .orderBy("Formularios.id", "ASC"); // Ordena por el ID de Formularios en orden ascendente
                const result = yield queryBuilder.getMany();
                return result;
            }
            catch (error) {
                // Manejar la excepción adecuadamente
                throw new Error('No se pudo recuperar el formulario: ' + error);
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Formularios")
                    .leftJoinAndSelect("Formularios.ModuloId", "Modulos")
                    .where("Formularios.id = :id", { id });
                const result = yield queryBuilder.getOne();
                if (!result) {
                    throw new http_errors_1.NotFound("Formulario not found");
                }
                return result;
            }
            catch (error) {
                // Manejar la excepción adecuadamente
                throw new Error('No se pudo recuperar el formulario: ' + error);
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Formularios")
                    .where("Formularios.id = :id", { id });
                if (query && query.someCondition) {
                    queryBuilder.andWhere("Formularios.someColumn = :value", { value: query.someValue });
                }
                const result = yield queryBuilder.update().set(data).returning("*").execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound("Formulario not found");
                }
                return result.raw[0];
            }
            catch (error) {
                // Manejar la excepción adecuadamente
                throw new Error('No se pudo recuperar el formulario: ' + error);
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Formularios")
                    .where("Formularios.id = :id", { id });
                const result = yield queryBuilder.update()
                    .set({ Estado: ModelEntity_1.Estado.Desactivado, fecha_eliminacion: new Date() })
                    .returning("*")
                    .execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound("Producto no encontrada");
                }
                return result.raw[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.FormularioRepository = FormularioRepository;
