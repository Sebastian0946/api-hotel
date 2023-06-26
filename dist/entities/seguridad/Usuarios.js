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
exports.Usuarios = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Personas_1 = require("./Personas");
let Usuarios = exports.Usuarios = class Usuarios extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.OneToOne)(() => Personas_1.Personas),
    (0, typeorm_1.JoinColumn)({ name: 'personaId' }),
    __metadata("design:type", Personas_1.Personas)
], Usuarios.prototype, "PersonaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario', length: 25 }),
    __metadata("design:type", String)
], Usuarios.prototype, "Usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contraseña', length: 100 }),
    __metadata("design:type", String)
], Usuarios.prototype, "Contrase\u00F1a", void 0);
exports.Usuarios = Usuarios = __decorate([
    (0, typeorm_1.Entity)()
], Usuarios);
