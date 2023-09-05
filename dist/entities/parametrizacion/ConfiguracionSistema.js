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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiguracionSistema = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Usuarios_1 = require("../seguridad/Usuarios");
let ConfiguracionSistema = exports.ConfiguracionSistema = class ConfiguracionSistema extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuarios_1.Usuarios, (usuario) => usuario.ConfiguracionSistemaId),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", Usuarios_1.Usuarios)
], ConfiguracionSistema.prototype, "UsuarioId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo' }),
    __metadata("design:type", String)
], ConfiguracionSistema.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre' }),
    __metadata("design:type", String)
], ConfiguracionSistema.prototype, "Nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion' }),
    __metadata("design:type", String)
], ConfiguracionSistema.prototype, "Descripcion", void 0);
exports.ConfiguracionSistema = ConfiguracionSistema = __decorate([
    (0, typeorm_1.Entity)()
], ConfiguracionSistema);
