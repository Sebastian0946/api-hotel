"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.UsuarioController = void 0;
const routing_controllers_1 = require("routing-controllers");
const bcrypt = __importStar(require("bcrypt"));
const UsuarioRepository_1 = require("../../repository/seguridadRepository/UsuarioRepository");
const http_errors_1 = __importDefault(require("http-errors"));
let UsuarioController = exports.UsuarioController = class UsuarioController {
    constructor(repository) {
        this.repository = repository;
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                if (!body.PersonaId || !body.Usuario || !body.Contraseña) {
                    throw (0, http_errors_1.default)(400, 'Los campos PersonaId, Usuario y Contraseña son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
                }
                const saltRounds = 10;
                const hashedPassword = yield bcrypt.hash(body.Contraseña, saltRounds);
                // Reemplazar la contraseña original con el hash en el cuerpo
                body.Contraseña = hashedPassword;
                const result = yield this.repository.create(body);
                res.status(201).json({
                    message: 'Usuario creado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al crear el usuario:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo crear el usuario. Por favor, intenta nuevamente más tarde.');
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
                    message: 'Usuarios listados exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al listar los usuarios:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo listar los usuarios. Por favor, intenta nuevamente más tarde.');
                }
                else {
                    console.error('Error desconocido:', error);
                    throw (0, http_errors_1.default)(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
                }
            }
        });
    }
    ;
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.repository.get(id);
                res.status(200).json({
                    message: 'Usuario encontrado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al encontrar el usuario:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo encontrar el usuario. Por favor, intenta nuevamente más tarde.');
                }
                else {
                    console.error('Error desconocido:', error);
                    throw (0, http_errors_1.default)(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
                }
            }
        });
    }
    ;
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const body = req.body;
                if (!body.PersonaId || !body.Usuario || !body.Contraseña) {
                    throw (0, http_errors_1.default)(400, 'Los campos PersonaId, Usuario y Contraseña son obligatorios. Por favor, asegúrese de proporcionar todos los campos requeridos.');
                }
                const saltRounds = 10;
                const hashedPassword = yield bcrypt.hash(body.Contraseña, saltRounds);
                body.Contraseña = hashedPassword;
                const result = yield this.repository.update(id, body);
                res.status(200).json({
                    message: 'Usuario actualizado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al actualizar el usuario:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo actualizar el usuario. Por favor, intenta nuevamente más tarde.');
                }
                else {
                    console.error('Error desconocido:', error);
                    throw (0, http_errors_1.default)(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
                }
            }
        });
    }
    ;
    remove(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.repository.remove(id);
                res.status(200).json({
                    message: 'Usuario eliminado exitosamente',
                    data: result
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error('Error al eliminar el usuario:', error.message);
                    throw (0, http_errors_1.default)(500, 'No se pudo eliminar el usuario. Por favor, intenta nuevamente más tarde.');
                }
                else {
                    console.error('Error desconocido:', error);
                    throw (0, http_errors_1.default)(500, 'Ocurrió un error inesperado. Por favor, contacta al administrador.');
                }
            }
        });
    }
    ;
    getPermission(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario, contrasena } = req.params;
                const permisos = yield this.repository.getPermission(usuario, contrasena);
                res.status(200).json(permisos);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    getLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { usuario, contrasena } = req.params;
                const login = yield this.repository.getLogin(usuario, contrasena);
                res.status(200).json(login);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
};
__decorate([
    (0, routing_controllers_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "create", null);
__decorate([
    (0, routing_controllers_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "list", null);
__decorate([
    (0, routing_controllers_1.Get)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "get", null);
__decorate([
    (0, routing_controllers_1.Put)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Delete)('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "remove", null);
__decorate([
    (0, routing_controllers_1.Get)('/permissions/:usuario/:contrasena'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getPermission", null);
__decorate([
    (0, routing_controllers_1.Get)('/login/:usuario/:contrasena'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "getLogin", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, routing_controllers_1.JsonController)('/usuario'),
    __metadata("design:paramtypes", [UsuarioRepository_1.UsuarioRepository])
], UsuarioController);
