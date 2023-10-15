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
exports.DescuentosRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const Descuentos_1 = require("../../entities/sistema/Descuentos");
const ModelEntity_1 = require("../../entities/ModelEntity");
class DescuentosRepository {
    constructor() {
        this.repository = db_1.default.getRepository(Descuentos_1.Descuentos);
    }
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Descuentos_1.Descuentos);
                const result = repository.create(data);
                yield repository.save(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to create descuento');
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Descuentos_1.Descuentos);
                const result = yield repository.find();
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve descuentos');
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Descuentos_1.Descuentos);
                const result = yield repository.findOneBy({ id: id });
                if (!result) {
                    throw new http_errors_1.NotFound("Descuento not found");
                }
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve descuento');
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Descuentos_1.Descuentos);
                const queryBuilder = repository.createQueryBuilder('Descuentos')
                    .where('Descuentos.id = :id', { id });
                if (query) {
                    // Aquí puedes agregar condiciones adicionales según la consulta
                    // Por ejemplo:
                    if (query.someCondition) {
                        queryBuilder.andWhere('Descuentos.someColumn = :value', { value: query.someValue });
                    }
                }
                const result = yield queryBuilder.update().set(data).returning('*').execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound('Descuentos not found');
                }
                return result.raw[0];
            }
            catch (error) {
                throw new Error('Failed to update descuento');
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Descuentos")
                    .where("Descuentos.id = :id", { id });
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
exports.DescuentosRepository = DescuentosRepository;
