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
exports.CategoriaController = void 0;
const routing_controllers_1 = require("routing-controllers");
const CategoriaRepository_1 = require("../../repository/invetarioRepository/CategoriaRepository");
const http_errors_1 = __importDefault(require("http-errors"));
let CategoriaController = exports.CategoriaController = class CategoriaController {
    constructor(repository) {
        this.repository = repository;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { Codigo, Descripcion } = req.body;
                if (!Codigo || !Descripcion) {
                    throw (0, http_errors_1.default)(400, 'Los campos Codigo y Descripcion son obligatorios.');
                }
                const result = yield this.repository.create(req.body);
                res.status(201).json({
                    message: 'Categoria creada exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al crear la categoria:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo crear la categoria. Por favor, intenta nuevamente más tarde.');
                }
                else {
                    console.error('Error desconocido:', error);
                    throw (0, http_errors_1.default)(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
                }
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.list();
                res.status(200).json({
                    message: 'Categorias obtenidos exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al obtener las categorias:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo listar las categorias. Por favor, intenta nuevamente más tarde.');
                }
                else {
                    console.error('Error desconocido:', error);
                    throw (0, http_errors_1.default)(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
                }
            }
        });
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.repository.get(id);
                res.status(200).json({
                    message: 'Categoria encontrado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al encontrar la categoria:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo encontrar la categoria. Por favor, intenta nuevamente más tarde.');
                }
                else {
                    console.error('Error desconocido:', error);
                    throw (0, http_errors_1.default)(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
                }
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                // Validar que los campos Codigo y Descripcion no sean nulos o vacíos
                if (!body.Codigo || !body.Descripcion) {
                    throw (0, http_errors_1.default)(400, 'Los campos Codigo y Descripcion son obligatorios. Por favor, asegúrese de completar ambos campos.');
                }
                const result = yield this.repository.update(id, body);
                res.status(200).json({
                    message: 'Categoria actualizada exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al actualizar la categoria:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo actualizar la categoria. Por favor, intenta nuevamente más tarde.');
                }
                else {
                    console.error('Error desconocido:', error);
                    throw (0, http_errors_1.default)(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
                }
            }
        });
    }
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.repository.remove(id);
                res.status(200).json({
                    message: 'Categoria eliminada exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al eliminar la categoria:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo eliminar la categoria. Por favor, intenta nuevamente más tarde.');
                }
                else {
                    console.error('Error desconocido:', error);
                    throw (0, http_errors_1.default)(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
                }
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "create", null);
__decorate([
    (0, routing_controllers_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "list", null);
__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "get", null);
__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CategoriaController.prototype, "remove", null);
exports.CategoriaController = CategoriaController = __decorate([
    (0, routing_controllers_1.JsonController)('/categoria'),
    __metadata("design:paramtypes", [CategoriaRepository_1.CategoriaRepository])
], CategoriaController);
