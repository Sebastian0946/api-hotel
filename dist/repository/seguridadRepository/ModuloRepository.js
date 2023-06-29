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
exports.ModuloRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const Modulos_1 = require("../../entities/seguridad/Modulos");
class ModuloRepository {
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Modulos_1.Modulos);
            const result = repository.create(data);
            yield repository.save(result);
            return result;
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Modulos_1.Modulos);
            return repository.find();
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Modulos_1.Modulos);
            const result = yield repository.findOneBy({ id: id });
            if (!result) {
                throw new http_errors_1.NotFound("Modulo not Found");
            }
            ;
            return result;
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Modulos_1.Modulos);
            yield repository.update(id, data);
            return this.get(id, query);
        });
    }
    remove(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = db_1.default.getRepository(Modulos_1.Modulos);
            const result = yield this.get(id, query);
            yield repository.delete(id);
            return result;
        });
    }
}
exports.ModuloRepository = ModuloRepository;
