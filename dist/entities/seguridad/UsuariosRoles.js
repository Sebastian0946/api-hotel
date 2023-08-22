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
exports.UsuariosRoles = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Usuarios_1 = require("./Usuarios");
const Roles_1 = require("./Roles");
class UsuariosRoles extends ModelEntity_1.ModelEntity {
}
exports.UsuariosRoles = UsuariosRoles;
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_1.Roles),
    (0, typeorm_1.JoinColumn)({ name: 'rol_id' }),
    __metadata("design:type", Roles_1.Roles)
], UsuariosRoles.prototype, "RolesId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuarios_1.Usuarios),
    (0, typeorm_1.JoinColumn)({ name: 'usuario_id' }),
    __metadata("design:type", Usuarios_1.Usuarios)
], UsuariosRoles.prototype, "UsuariosId", void 0);
