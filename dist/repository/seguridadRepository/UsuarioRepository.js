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
exports.UsuarioRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const Usuarios_1 = require("../../entities/seguridad/Usuarios");
class UsuarioRepository {
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Usuarios_1.Usuarios);
            const result = repository.create(data);
            yield repository.save(result);
            return result;
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Usuarios_1.Usuarios);
            const queryBuilder = repository.createQueryBuilder('Usuarios')
                .leftJoinAndSelect('Usuarios.PersonaId', 'Personas');
            const result = yield queryBuilder.getMany();
            return result;
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Usuarios_1.Usuarios);
            const queryBuilder = repository.createQueryBuilder('Usuarios')
                .leftJoinAndSelect('Usuarios.PersonaId', 'persona')
                .where('Usuarios.id = :id', { id });
            const result = yield queryBuilder.getOne();
            if (!result) {
                throw new http_errors_1.NotFound('Usuario not found');
            }
            return result;
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Usuarios_1.Usuarios);
            yield repository.update(id, data);
            return this.get(id, query);
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Usuarios_1.Usuarios);
            const result = yield this.get(id, query);
            yield repository.delete(id);
            return result;
        });
    }
}
exports.UsuarioRepository = UsuarioRepository;
