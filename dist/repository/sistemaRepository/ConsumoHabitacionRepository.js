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
exports.ConsumoHabitacionRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const ConsumoHabitaciones_1 = require("../../entities/sistema/ConsumoHabitaciones");
class ConsumoHabitacionRepository {
    constructor() {
        this.repository = db_1.default.getRepository(ConsumoHabitaciones_1.ConsumoHabitaciones);
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
                throw error;
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("ConsumoHabitaciones")
                    .leftJoinAndSelect("ConsumoHabitaciones.ProductoId", "Productos")
                    .leftJoinAndSelect("ConsumoHabitaciones.ReservaHabitacionesId", "ReservaHabitaciones");
                const result = yield queryBuilder.getMany();
                return result;
            }
            catch (error) {
                // Manejar la excepción adecuadamente
                throw error;
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("ConsumoHabitaciones")
                    .leftJoinAndSelect("ConsumoHabitaciones.ProductoId", "Productos")
                    .leftJoinAndSelect("ConsumoHabitaciones.ReservaHabitacionesId", "ReservaHabitaciones")
                    .where("ConsumoHabitaciones.id = :id", { id });
                const result = yield queryBuilder.getOne();
                if (!result) {
                    throw new http_errors_1.NotFound("ConsumoHabitacion not found");
                }
                return result;
            }
            catch (error) {
                // Manejar la excepción adecuadamente
                throw error;
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("ConsumoHabitaciones")
                    .where("ConsumoHabitaciones.id = :id", { id });
                if (query && query.someCondition) {
                    queryBuilder.andWhere("ConsumoHabitaciones.someColumn = :value", { value: query.someValue });
                }
                const result = yield queryBuilder.update().set(data).returning("*").execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound("ConsumoHabitaciones not found");
                }
                return result.raw[0];
            }
            catch (error) {
                // Manejar la excepción adecuadamente
                throw error;
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.get(id, query);
                yield this.repository.delete(id);
                return result;
            }
            catch (error) {
                // Manejar la excepción adecuadamente
                throw error;
            }
        });
    }
}
exports.ConsumoHabitacionRepository = ConsumoHabitacionRepository;