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
const ModelEntity_1 = require("../../entities/ModelEntity");
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
                    .leftJoinAndSelect("ConsumoHabitaciones.ReservaHabitacionesId", "ReservaHabitaciones")
                    .leftJoinAndSelect("ReservaHabitaciones.HabitacionId", "Habitaciones")
                    .leftJoinAndSelect("ReservaHabitaciones.DescuentoId", "Descuentos")
                    .leftJoinAndSelect("Habitaciones.HuespedId", "Huespedes")
                    .leftJoinAndSelect("Huespedes.PersonaId", "Personas")
                    .leftJoinAndSelect("Habitaciones.TipoHabitacionesId", "TipoHabitaciones")
                    .orderBy("ConsumoHabitaciones.id", "ASC");
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
                    .leftJoinAndSelect("ConsumoHabitaciones.ReservaHabitacionesId", "ReservaHabitaciones")
                    .leftJoinAndSelect("ReservaHabitaciones.HabitacionId", "Habitaciones")
                    .leftJoinAndSelect("ReservaHabitaciones.DescuentoId", "Descuentos")
                    .leftJoinAndSelect("Habitaciones.HuespedId", "Huespedes")
                    .leftJoinAndSelect("Huespedes.PersonaId", "Personas")
                    .leftJoinAndSelect("Habitaciones.TipoHabitacionesId", "TipoHabitaciones")
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
                const queryBuilder = this.repository.createQueryBuilder("consumo_habitaciones")
                    .where("consumo_habitaciones.id = :id", { id });
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
exports.ConsumoHabitacionRepository = ConsumoHabitacionRepository;
