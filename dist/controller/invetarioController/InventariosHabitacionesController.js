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
exports.InventariosHabitacionesController = void 0;
const routing_controllers_1 = require("routing-controllers");
const InventarioHabitacionRepository_1 = require("../../repository/invetarioRepository/InventarioHabitacionRepository");
const http_errors_1 = __importDefault(require("http-errors"));
const class_validator_1 = require("class-validator");
let InventariosHabitacionesController = exports.InventariosHabitacionesController = class InventariosHabitacionesController {
    constructor(repository) {
        this.repository = repository;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                if (!body.InventarioId || !body.AdministracionHabitacionId || !body.Codigo || !body.Cantidad) {
                    throw (0, http_errors_1.default)(400, 'Los campos InventarioId, AdministracionHabitacionId, Codigo y Cantidad son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
                }
                const result = yield this.repository.create(body);
                res.status(201).json({
                    message: 'Inventario habitacion creado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof class_validator_1.ValidationError) {
                    // Error de validación (por ejemplo, datos faltantes o inválidos)
                    res.status(400).json({
                        message: 'Error de validación',
                        details: error.toString(),
                    });
                }
                else {
                    const internalError = error;
                    res.status(500).json({
                        message: 'Ocurrió un error inesperado',
                        details: internalError.toString(),
                    });
                }
            }
        });
    }
    list(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.repository.list();
                res.status(200).json({
                    message: 'Inventario habitacion listado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof class_validator_1.ValidationError) {
                    res.status(400).json({
                        message: 'Error de validación',
                        details: error.toString(),
                    });
                }
                else {
                    const internalError = error;
                    res.status(500).json({
                        message: 'Ocurrió un error inesperado',
                        details: internalError.toString(),
                    });
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
                    message: 'Inventario habitacion encontrado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof class_validator_1.ValidationError) {
                    res.status(400).json({
                        message: 'Error de validación',
                        details: error.toString(),
                    });
                }
                else {
                    const internalError = error;
                    res.status(500).json({
                        message: 'Ocurrió un error inesperado',
                        details: internalError.toString(),
                    });
                }
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                if (!body.InventarioId || !body.AdministracionHabitacionId || !body.Codigo || !body.Cantidad) {
                    throw (0, http_errors_1.default)(400, 'Los campos InventarioId, AdministracionHabitacionId, Codigo y Cantidad son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
                }
                const result = yield this.repository.update(id, body);
                res.status(200).json({
                    message: 'Inventario habitacion actualizado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof class_validator_1.ValidationError) {
                    res.status(400).json({
                        message: 'Error de validación',
                        details: error.toString(),
                    });
                }
                else {
                    const internalError = error;
                    res.status(500).json({
                        message: 'Ocurrió un error inesperado',
                        details: internalError.toString(),
                    });
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
                    message: 'Inventario habitacion elimnado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof class_validator_1.ValidationError) {
                    res.status(400).json({
                        message: 'Error de validación',
                        details: error.toString(),
                    });
                }
                else {
                    const internalError = error;
                    res.status(500).json({
                        message: 'Ocurrió un error inesperado',
                        details: internalError.toString(),
                    });
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
], InventariosHabitacionesController.prototype, "create", null);
__decorate([
    (0, routing_controllers_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], InventariosHabitacionesController.prototype, "list", null);
__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], InventariosHabitacionesController.prototype, "get", null);
__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], InventariosHabitacionesController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], InventariosHabitacionesController.prototype, "remove", null);
exports.InventariosHabitacionesController = InventariosHabitacionesController = __decorate([
    (0, routing_controllers_1.JsonController)('/inventarioHabitacion'),
    __metadata("design:paramtypes", [InventarioHabitacionRepository_1.InventarioHabitacionRepository])
], InventariosHabitacionesController);
