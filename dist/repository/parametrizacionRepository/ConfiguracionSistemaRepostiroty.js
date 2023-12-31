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
exports.ConfiguracionSistemaRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const ConfiguracionSistema_1 = require("../../entities/parametrizacion/ConfiguracionSistema");
const ModelEntity_1 = require("../../entities/ModelEntity");
class ConfiguracionSistemaRepository {
    constructor() {
        this.repository = db_1.default.getRepository(ConfiguracionSistema_1.ConfiguracionSistema);
    }
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = this.repository.create(data);
                yield this.repository.save(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to create configuracion sistema');
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("ConfiguracionSistema")
                    .leftJoinAndSelect("ConfiguracionSistema.UsuarioId", "Usuarios")
                    .orderBy("ConfiguracionSistema.id", "ASC");
                const result = yield queryBuilder.getMany();
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve configuraciones sistema');
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("ConfiguracionSistema")
                    .leftJoinAndSelect("ConfiguracionSistema.UsuarioId", "Usuarios")
                    .where("ConfiguracionSistema.id = :id", { id });
                const result = yield queryBuilder.getOne();
                if (!result) {
                    throw new http_errors_1.NotFound("ConfiguracionSistema not found");
                }
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve configuracion sistema');
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("configuracion_sistema")
                    .where("configuracion_sistema.id = :id", { id });
                if (query && query.someCondition) {
                    queryBuilder.andWhere("configuracion_sistema.someColumn = :value", { value: query.someValue });
                }
                const result = yield queryBuilder.update().set(data).returning("*").execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound("ConfiguracionSistema not found");
                }
                return result.raw[0];
            }
            catch (error) {
                throw new Error('Failed to update configuracion sistema');
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("configuracion_sistema")
                    .where("configuracion_sistema.id = :id", { id });
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
exports.ConfiguracionSistemaRepository = ConfiguracionSistemaRepository;
