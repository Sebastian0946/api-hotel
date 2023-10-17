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
exports.ReservaHabitacionRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const ReservaHabitaciones_1 = require("../../entities/sistema/ReservaHabitaciones");
const ModelEntity_1 = require("../../entities/ModelEntity");
const typeorm_1 = require("typeorm");
class ReservaHabitacionRepository {
    constructor() {
        this.repository = db_1.default.getRepository(ReservaHabitaciones_1.ReservaHabitaciones);
    }
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(ReservaHabitaciones_1.ReservaHabitaciones);
                const result = repository.create(data);
                yield repository.save(result);
                return result;
            }
            catch (error) {
                if (error instanceof typeorm_1.QueryFailedError) {
                    throw new Error('Error al ejecutar la consulta en la base de datos: ' + error.message);
                }
                else {
                    throw error;
                }
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(ReservaHabitaciones_1.ReservaHabitaciones);
                const queryBuilder = repository.createQueryBuilder('ReservaHabitaciones')
                    .leftJoinAndSelect('ReservaHabitaciones.HabitacionId', 'Habitaciones')
                    .leftJoinAndSelect('Habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                    .leftJoinAndSelect('Habitaciones.HuespedId', 'huespedes')
                    .leftJoinAndSelect('huespedes.PersonaId', 'personas')
                    .leftJoinAndSelect('ReservaHabitaciones.DescuentoId', 'Descuentos')
                    .orderBy('ReservaHabitaciones.id', 'ASC');
                const result = yield queryBuilder.getMany();
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve ReservaHabitaciones');
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(ReservaHabitaciones_1.ReservaHabitaciones);
                const queryBuilder = repository.createQueryBuilder('ReservaHabitaciones')
                    .leftJoinAndSelect('ReservaHabitaciones.HabitacionId', 'Habitaciones')
                    .leftJoinAndSelect('Habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                    .leftJoinAndSelect('Habitaciones.HuespedId', 'huespedes')
                    .leftJoinAndSelect('huespedes.PersonaId', 'personas')
                    .leftJoinAndSelect('ReservaHabitaciones.DescuentoId', 'Descuentos')
                    .where('ReservaHabitaciones.id = :id', { id });
                const result = yield queryBuilder.getOne();
                if (!result) {
                    throw new http_errors_1.NotFound('ReservaHabitaciones not found');
                }
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve ReservaHabitaciones');
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(ReservaHabitaciones_1.ReservaHabitaciones);
                const queryBuilder = repository.createQueryBuilder('ReservaHabitaciones')
                    .where('ReservaHabitaciones.id = :id', { id });
                if (query) {
                    if (query.someCondition) {
                        queryBuilder.andWhere('ReservaHabitaciones.someColumn = :value', { value: query.someValue });
                    }
                }
                const result = yield queryBuilder.update().set(data).returning('*').execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound('ReservaHabitaciones not found');
                }
                return result.raw[0];
            }
            catch (error) {
                throw new Error('Failed to update ReservaHabitaciones');
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("reserva_habitaciones")
                    .where("reserva_habitaciones.id = :id", { id });
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
exports.ReservaHabitacionRepository = ReservaHabitacionRepository;
