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
exports.InventarioHabitacionRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const InventariosHabitaciones_1 = require("../../entities/inventario/InventariosHabitaciones");
class InventarioHabitacionRepository {
    constructor() {
        this.repository = db_1.default.getRepository(InventariosHabitaciones_1.InventariosHabitaciones);
    }
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = this.repository.create(data);
                yield this.repository.save(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to create inventario habitacion');
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("inventarios_habitaciones")
                    .leftJoinAndSelect("inventarios_habitaciones.InventarioId", "Inventarios")
                    .leftJoinAndSelect("inventarios_habitaciones.AdministracionHabitacionId", "Habitaciones");
                const result = yield queryBuilder.getMany();
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve inventarios habitaciones');
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("inventarios_habitaciones")
                    .leftJoinAndSelect("inventarios_habitaciones.InventarioId", "Inventarios")
                    .leftJoinAndSelect("inventarios_habitaciones.AdministracionHabitacionId", "Habitaciones")
                    .where("inventarios_habitaciones.id = :id", { id });
                const result = yield queryBuilder.getOne();
                if (!result) {
                    throw new http_errors_1.NotFound("InventarioHabitacion not found");
                }
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve inventario habitacion');
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("inventarios_habitaciones")
                    .where("inventarios_habitaciones.id = :id", { id });
                if (query && query.someCondition) {
                    queryBuilder.andWhere("inventarios_habitaciones.someColumn = :value", { value: query.someValue });
                }
                const result = yield queryBuilder.update().set(data).returning("*").execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound("InventarioHabitacion not found");
                }
                return result.raw[0];
            }
            catch (error) {
                throw new Error('Failed to update inventario habitacion');
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.get(id, query);
                yield this.repository.remove(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to remove inventario habitacion');
            }
        });
    }
}
exports.InventarioHabitacionRepository = InventarioHabitacionRepository;
