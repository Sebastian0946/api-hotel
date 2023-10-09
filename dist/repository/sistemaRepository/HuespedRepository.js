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
exports.HuespedRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const Huespedes_1 = require("../../entities/sistema/Huespedes");
class HuespedRepository {
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Huespedes_1.Huespedes);
                const existingHuesped = yield this.list({ where: { PersonaId: data.PersonaId } });
                const result = existingHuesped.length > 0 ? existingHuesped[0] : repository.create(data);
                yield repository.save(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to create huesped');
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Huespedes_1.Huespedes);
                const queryBuilder = repository.createQueryBuilder('Huespedes')
                    .leftJoinAndSelect('Huespedes.PersonaId', 'Personas')
                    .leftJoinAndSelect('Huespedes.DescuentoId', 'Descuento');
                if (query && query.where && query.where.PersonaId) {
                    queryBuilder.where('Personas.id = :personaId', { personaId: query.where.PersonaId });
                }
                const result = yield queryBuilder.getMany();
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve huespedes');
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Huespedes_1.Huespedes);
                const queryBuilder = repository.createQueryBuilder('Huespedes')
                    .leftJoinAndSelect('Huespedes.PersonaId', 'Personas')
                    .leftJoinAndSelect('Huespedes.DescuentoId', 'Descuento')
                    .where('Huespedes.id = :id', { id });
                const result = yield queryBuilder.getOne();
                if (!result) {
                    throw new http_errors_1.NotFound('Huespedes not found');
                }
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve huesped');
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Huespedes_1.Huespedes);
                const queryBuilder = repository.createQueryBuilder('Huespedes')
                    .where('Huespedes.id = :id', { id });
                if (query) {
                    if (query.someCondition) {
                        queryBuilder.andWhere('Huespedes.someColumn = :value', { value: query.someValue });
                    }
                }
                const result = yield queryBuilder.update().set(data).returning('*').execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound('Huespedes not found');
                }
                return result.raw[0];
            }
            catch (error) {
                throw new Error('Failed to update huesped');
            }
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Huespedes_1.Huespedes);
                const result = yield this.get(id, query);
                yield repository.remove(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to remove huesped');
            }
        });
    }
    createWithMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = db_1.default.getRepository(Huespedes_1.Huespedes);
                const existingHuesped = yield this.list({ where: { PersonaId: data.PersonaId } });
                const result = existingHuesped.length > 0 ? existingHuesped[0] : repository.create(data);
                yield repository.save(result);
                return { message: existingHuesped.length > 0 ? 'El huésped ya existe.' : 'Huésped creado con éxito.', huesped: result };
            }
            catch (error) {
                throw new Error('Failed to create huesped');
            }
        });
    }
}
exports.HuespedRepository = HuespedRepository;
