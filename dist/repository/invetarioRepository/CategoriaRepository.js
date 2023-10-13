"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.CategoriaRepository = void 0;
const http_errors_1 = require("http-errors");
const db_1 = __importDefault(require("../../db"));
const Categorias_1 = require("../../entities/inventario/Categorias");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
class CategoriaRepository {
    constructor() {
        this.repository = db_1.default.getRepository(Categorias_1.Categorias);
    }
    create(data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = this.repository.create(data);
                yield this.repository.save(result);
                return result;
            }
            catch (error) {
                throw new Error('Failed to create categoria');
            }
        });
    }
    list(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.repository.find();
            }
            catch (error) {
                throw new Error('Failed to retrieve categorias');
            }
        });
    }
    get(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.findOneBy({ id: id });
                if (!result) {
                    throw new http_errors_1.NotFound("Categoria not found");
                }
                return result;
            }
            catch (error) {
                throw new Error('Failed to retrieve categoria');
            }
        });
    }
    update(id, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryBuilder = this.repository.createQueryBuilder("Categorias")
                    .where("Categorias.id = :id", { id });
                if (query && query.someCondition) {
                    queryBuilder.andWhere("Categorias.someColumn = :value", { value: query.someValue });
                }
                const result = yield queryBuilder.update().set(data).returning("*").execute();
                if (result.affected === 0) {
                    throw new http_errors_1.NotFound("Categorias not found");
                }
                return result.raw[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entityManager = (0, typeorm_1.getManager)();
                const updateQuery = `
                UPDATE categorias
                SET estado = 'Desactivado', fecha_eliminacion = NOW()
                WHERE id = $1
                RETURNING *;
            `;
                const result = yield entityManager.query(updateQuery, [id]);
                if (result.length === 0) {
                    throw new http_errors_1.NotFound("Categoría no encontrada");
                }
                return result.raw[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CategoriaRepository = CategoriaRepository;
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriaRepository.prototype, "remove", null);
