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
exports.Personas = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Huespedes_1 = require("../sistema/Huespedes");
const Usuarios_1 = require("./Usuarios");
var TipoDocumento;
(function (TipoDocumento) {
    TipoDocumento["CC"] = "CC";
    TipoDocumento["TI"] = "TI";
})(TipoDocumento || (TipoDocumento = {}));
var Genero;
(function (Genero) {
    Genero["M"] = "Masculino";
    Genero["F"] = "Femenino";
})(Genero || (Genero = {}));
let Personas = exports.Personas = class Personas extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_documento', type: 'enum', enum: TipoDocumento, nullable: false }),
    __metadata("design:type", String)
], Personas.prototype, "TipoDocumento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'documento', unique: true }),
    __metadata("design:type", Number)
], Personas.prototype, "Documento", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombres', length: 25 }),
    __metadata("design:type", String)
], Personas.prototype, "Nombres", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellidos', length: 25 }),
    __metadata("design:type", String)
], Personas.prototype, "Apellidos", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', unique: true, length: 50 }),
    __metadata("design:type", String)
], Personas.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'direccion', length: 30 }),
    __metadata("design:type", String)
], Personas.prototype, "Direccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'telefono', length: 13 }),
    __metadata("design:type", String)
], Personas.prototype, "Telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'edad', nullable: true }),
    __metadata("design:type", Number)
], Personas.prototype, "Edad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'genero', type: 'enum', enum: Genero, nullable: true }),
    __metadata("design:type", String)
], Personas.prototype, "Genero", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Usuarios_1.Usuarios, (usuario) => usuario.PersonaId),
    __metadata("design:type", Usuarios_1.Usuarios)
], Personas.prototype, "UsuarioId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Huespedes_1.Huespedes, (huesped) => huesped.PersonaId),
    __metadata("design:type", Huespedes_1.Huespedes)
], Personas.prototype, "HuespedId", void 0);
exports.Personas = Personas = __decorate([
    (0, typeorm_1.Entity)()
], Personas);
