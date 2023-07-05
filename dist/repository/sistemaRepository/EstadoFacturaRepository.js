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
exports.EstadoFacturaRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const EstadoFacturas_1 = require("../../entities/sistema/EstadoFacturas");
class EstadoFacturaRepository {
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(EstadoFacturas_1.EstadoFacturas);
                const result = repository.create(data);
                yield repository.save(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to create estado factura');
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(EstadoFacturas_1.EstadoFacturas);
                const result = yield repository.find();
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve estado facturas');
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(EstadoFacturas_1.EstadoFacturas);
                const result = yield repository.findOneBy({ id: id });
                if (!result) {
                    throw new http_errors_1.NotFound("EstadoFactura not found");
                }
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve estado factura');
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(EstadoFacturas_1.EstadoFacturas);
                const queryBuilder = repository.createQueryBuilder('EstadoFacturas')
                    .where('EstadoFacturas.id = :id', { id });
                if (query) {
                    // Aquí puedes agregar condiciones adicionales según la consulta
                    // Por ejemplo:
                    if (query.someCondition) {
                        queryBuilder.andWhere('EstadoFacturas.someColumn = :value', { value: query.someValue });
                    }
                }
                const result = yield queryBuilder.update().set(data).returning('*').execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound('EstadoFacturas not found');
                }
                return result.raw[0];
            }
            catch (error) {
                throw new Error('Failed to update estado factura');
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(EstadoFacturas_1.EstadoFacturas);
                const result = yield this.get(id, query);
                yield repository.remove(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to remove estado factura');
            }
        });
    }
}
exports.EstadoFacturaRepository = EstadoFacturaRepository;
