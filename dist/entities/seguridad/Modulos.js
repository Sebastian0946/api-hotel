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
exports.Modulos = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Formularios_1 = require("./Formularios");
class Modulos extends ModelEntity_1.ModelEntity {
}
exports.Modulos = Modulos;
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', unique: true, length: 25, nullable: false }),
    __metadata("design:type", String)
], Modulos.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ruta', length: 25, nullable: false, unique: true }),
    __metadata("design:type", String)
], Modulos.prototype, "Ruta", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'etiqueta', length: 25, nullable: false, unique: true }),
    __metadata("design:type", String)
], Modulos.prototype, "Etiqueta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Formularios_1.Formularios, (formulario) => formulario.ModuloId),
    __metadata("design:type", Array)
], Modulos.prototype, "FormularioId", void 0);
