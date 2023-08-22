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
exports.HabitacionRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const Habitaciones_1 = require("../../entities/sistema/Habitaciones");
class HabitacionRepository {
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Habitaciones_1.Habitaciones);
                const result = repository.create(data);
                yield repository.save(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to create habitacion');
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Habitaciones_1.Habitaciones);
                const queryBuilder = repository.createQueryBuilder('habitaciones')
                    .leftJoinAndSelect('habitaciones.TipoHabitacionesId', 'TipoHabitaciones');
                const result = yield queryBuilder.getMany();
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve habitaciones');
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Habitaciones_1.Habitaciones);
                const queryBuilder = repository.createQueryBuilder('habitaciones')
                    .leftJoinAndSelect('habitaciones.TipoHabitacionesId', 'TipoHabitaciones')
                    .where('habitaciones.id = :id', { id });
                const result = yield queryBuilder.getOne();
                if (!result) {
                    throw new http_errors_1.NotFound('Habitacion not found');
                }
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve habitacion');
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Habitaciones_1.Habitaciones);
                const queryBuilder = repository.createQueryBuilder('habitaciones')
                    .where('habitaciones.id = :id', { id });
                if (query) {
                    if (query.someCondition) {
                        queryBuilder.andWhere('habitaciones.someColumn = :value', { value: query.someValue });
                    }
                }
                const result = yield queryBuilder.update().set(data).returning('*').execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound('Habitaciones not found');
                }
                return result.raw[0];
            }
            catch (error) {
                throw new Error('Failed to update habitacion');
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Habitaciones_1.Habitaciones);
                const result = yield this.get(id, query);
                yield repository.remove(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to remove habitacion');
            }
        });
    }
}
exports.HabitacionRepository = HabitacionRepository;
