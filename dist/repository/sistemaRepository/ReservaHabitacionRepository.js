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
                if (data.FechaEntrada && data.FechaSalida && (yield this.reservasSeSuperponen(data.FechaEntrada, data.FechaSalida))) {
                    throw new Error('Las fechas de entrada y salida se superponen con reservas existentes.');
                }
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
    getCodigo(Codigo, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(ReservaHabitaciones_1.ReservaHabitaciones);
                const queryBuilder = repository.createQueryBuilder('ReservaHabitaciones')
                    .leftJoinAndSelect('ReservaHabitaciones.HabitacionId', 'Habitaciones')
                    .leftJoinAndSelect('Habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                    .leftJoinAndSelect('Habitaciones.HuespedId', 'huespedes')
                    .leftJoinAndSelect('huespedes.PersonaId', 'personas')
                    .leftJoinAndSelect('ReservaHabitaciones.DescuentoId', 'Descuentos')
                    .where('ReservaHabitaciones.codigo = :codigo', { Codigo });
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
    reservasSeSuperponen(fechaEntrada, fechaSalida) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(ReservaHabitaciones_1.ReservaHabitaciones);
            // Convierte fechaEntrada y fechaSalida en objetos Date si no lo son
            if (!(fechaSalida instanceof Date)) {
                fechaSalida = new Date(fechaSalida);
            }
            if (!(fechaEntrada instanceof Date)) {
                fechaEntrada = new Date(fechaEntrada);
            }
            if (isNaN(fechaEntrada.getTime()) || isNaN(fechaSalida.getTime())) {
                throw new Error('Las fechas de entrada y salida no son válidas.');
            }
            const unDia = 24 * 60 * 60 * 1000;
            const diferenciaDias = (fechaSalida.getTime() - fechaEntrada.getTime()) / unDia;
            console.log('Diferencia en días:', diferenciaDias);
            const reservasSuperpuestas = yield repository
                .createQueryBuilder('ReservaHabitaciones')
                .where('(:fechaEntrada <= ReservaHabitaciones.FechaSalida) AND (:fechaSalida >= ReservaHabitaciones.FechaEntrada)', {
                fechaEntrada,
                fechaSalida,
            })
                .andWhere(`(:diferenciaDias > 0)`, {
                diferenciaDias,
            })
                .getCount();
            return reservasSuperpuestas > 0;
        });
    }
}
exports.ReservaHabitacionRepository = ReservaHabitacionRepository;
